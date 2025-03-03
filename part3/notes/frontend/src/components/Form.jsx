export default function Form({ newNote, setNewNote, submit }) {
  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  return (
    <>
      <form onSubmit={submit}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="new note content..."
            aria-label="new note content..."
            aria-describedby="button-addon2"
            value={newNote}
            onChange={handleNoteChange}
          />
          <button className="btn btn-primary" type="submit" id="button-addon2">
            Save
          </button>
        </div>
      </form>
    </>
  );
}
