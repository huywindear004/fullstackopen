import contactServices from "../services/contact";

export default function Persons({ persons, setPersons, setMessage }) {
  const handleDelete = (id) => {
    let isDelete = window.confirm("Do you really want to delete this person?");
    if (isDelete) {
      contactServices.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
        setMessage({ content: "Deleted", type: "success" });
      });
    }
  };
  return (
    <ul className="list-group">
      {persons.map((person) => {
        return (
          <li key={person.id} className="list-group-item">
            <span className="me-1">
              {person.name} | {person.number}
            </span>
            <button
              className="btn btn-danger"
              type="button"
              onClick={() => handleDelete(person.id)}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
}
