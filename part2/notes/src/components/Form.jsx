export default function Form({ newNote, setNewNote, submit }) {
  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  return (
    <>
      <form onSubmit={submit}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </>
  );
}
