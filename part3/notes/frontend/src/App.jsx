import { useState, useEffect } from "react";
import Form from "./components/Form";
import Note from "./components/Note";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import noteService from "./services/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    console.log("effect");
    noteService.getAll().then((notes) => setNotes(notes));
  }, []);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };
    noteService
      .create(noteObject)
      .then((newNote) => {
        setNotes(notes.concat(newNote));
        setNewNote("");
        setMessage({
          content: `Added note: '${newNote.content}'`,
          state: "success",
        });
      })
      .catch((error) => {
        setMessage({
          content: "Could not add note",
          state: "error",
        });
      });
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((changedNote) => {
        setNotes(notes.map((n) => (n.id === id ? changedNote : n)));
        setMessage({
          content: `Updated importance of '${changedNote.content}'`,
          state: "success",
        });
      })
      .catch((error) => {
        setMessage({
          content: "Could not update note importance",
          state: "error",
        });
      });
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <>
      <Notification message={message} />
      <div className="container my-3">
        <Form submit={addNote} newNote={newNote} setNewNote={setNewNote} />
        <Filter showAll={showAll} setShowAll={setShowAll} />
        <ul className="list-group">
          {notesToShow.map((note) => (
            <Note
              key={note.id}
              note={note}
              toggleImportanceOf={() => toggleImportanceOf(note.id)}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
