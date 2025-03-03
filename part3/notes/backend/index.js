const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: false,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: false,
  },
  {
    id: "4",
    content: "a new note...",
    important: false,
  },
  {
    id: "5",
    content: "a new note...",
    important: false,
  },
  {
    id: "6",
    content: "3 secs",
    important: false,
  },
  {
    id: "c67f",
    content: "a new note...",
    important: false,
  },
  {
    id: "e6ff",
    content: "a new note...",
    important: false,
  },
  {
    id: "d9f2",
    content: "3123",
    important: true,
  },
  {
    id: "e722",
    content: "a new note...",
    important: true,
  },
];

const MAX_ID_LENGTH = 4;

const generateID = () => {
  return Math.random()
    .toString()
    .substring(2, 2 + MAX_ID_LENGTH);
};

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateID(),
  };

  notes = notes.concat(note);

  response.json(note);
});

app.put("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  const note = request.body;

  notes = notes.map((n) => (n.id !== id ? n : note));
  response.json(note);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);
