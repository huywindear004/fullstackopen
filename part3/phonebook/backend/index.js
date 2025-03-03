const express = require("express");
const morgan = require("morgan");

const app = express();

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

let phoneBook = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const MAX_ID_LENGTH = 4;

const generateID = () => {
  return Math.random()
    .toString()
    .substring(2, 2 + MAX_ID_LENGTH);
};

app.get("/api/persons", (req, res) => {
  return res.json(phoneBook);
});

app.post("/api/persons", (req, res) => {
  let body = req.body;
  // Missing content
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  // Check if name already exists
  if (
    phoneBook.find(
      (person) => person.name.toLowerCase() === body.name.toLowerCase()
    )
  ) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    id: generateID(),
    name: body.name,
    number: body.number,
  };
  phoneBook.push(person);
  return res.json(person);
});

app.get("/api/persons/:id", (req, res) => {
  let id = req.params.id;
  let result = phoneBook.find((person) => person.id === id);

  if (result) {
    return res.json(result);
  }
  return res.status(404).end();
});

app.delete("/api/persons/:id", (req, res) => {
  let id = req.params.id;
  phoneBook = phoneBook.filter((person) => person.id !== id);
  return res.status(204).end();
});

app.put("/api/persons/:id", (req, res) => {
  let id = req.params.id;
  let body = req.body;
  let person = {
    name: body.name,
    number: body.number,
  };

  phoneBook = phoneBook.map((p) => (p.id !== id ? p : { ...p, ...person }));
  return res.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);
