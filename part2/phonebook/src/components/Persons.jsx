import contactServices from "../services/contact";

export default function Persons({ persons, setPersons, setMessage }) {
  const handleDelete = (id) => {
    let isDelete = window.confirm("Do you really want to delete this person?");
    if (isDelete) {
      contactServices
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch(() => {
          setMessage({
            content: `Information of this person has already been removed from server`,
            type: "error",
          });
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };
  return (
    <ul>
      {persons.map((person) => {
        return (
          <li key={person.id}>
            <span>
              {person.name} | {person.number}
            </span>
            <button type="button" onClick={() => handleDelete(person.id)}>
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
}
