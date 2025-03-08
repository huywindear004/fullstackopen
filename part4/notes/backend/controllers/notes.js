const notesRouter = require("express").Router();
const Note = require("../models/note");

notesRouter.get("/", async (request, response) => {
  return response.json(await Note.find({}));
});

notesRouter.get("/:id", async (request, response) => {
  const note = await Note.findById(request.params.id);
  if (note) {
    return response.json(note);
  }
  return response.status(404).end();
});

notesRouter.post("/", async (request, response) => {
  const body = request.body;

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  return response.status(201).json(await note.save());
});

notesRouter.delete("/:id", async (request, response) => {
  await Note.findByIdAndDelete(request.params.id);
  return response.status(204).end();
});

notesRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, {
    new: true,
    runValidators: true,
    context: "query",
  });
  return response.json(updatedNote);
});

module.exports = notesRouter;
