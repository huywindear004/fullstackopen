export default function Note({ note, toggleImportanceOf }) {
  const label = note.important ? "make not important" : "make important";

  return (
    <li className={note.important ? "important" : ""}>
      {note.content} <button onClick={toggleImportanceOf}>{label}</button>
    </li>
  );
}
