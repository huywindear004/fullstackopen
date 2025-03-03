export default function Note({ note, toggleImportanceOf }) {
  const label = note.important ? "make not important" : "make important";

  return (
    <li
      className={
        (note.important ? "list-group-item-danger" : "") + " list-group-item"
      }
    >
      {note.content}{" "}
      <button onClick={toggleImportanceOf} className="btn btn-secondary">
        {label}
      </button>
    </li>
  );
}
