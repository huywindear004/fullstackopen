require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Contact = require("./models/contact");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
app.use(
  morgan((tokens, req, res) =>
    [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      JSON.stringify(req.body),
    ].join(" ")
  )
);

app.get("/api/persons", (req, res, next) => {
  Contact.find()
    .then((contacts) => {
      return res.json(contacts);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (req, res, next) => {
  Contact.findById(req.params.id)
    .then((contact) => {
      if (contact) return res.json(contact);
      return res.status(404).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", async (req, res, next) => {
  const body = req.body;
  const person = Contact({
    name: body.name,
    number: body.number,
  });
  console.log(person);

  // Check if name already exists
  if (
    await Contact.findOne({ name: { $regex: `^${body.name}$`, $options: "i" } })
  ) {
    return res.status(400).json({ error: "name must be unique" });
  }

  person
    .save()
    .then((savedPerson) => {
      return res.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Contact.findByIdAndDelete(req.params.id)
    .then(() => {
      return res.status(204).end();
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  const contact = {
    name: req.body.name,
    number: req.body.number,
  };

  Contact.findByIdAndUpdate(id, contact, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedContact) => {
      return res.json(updatedContact);
    })
    .catch((error) => next(error));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// ======================== Unknown endpoint ========================
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

// ======================== Error handler ========================
const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler);
