export default function PersonList({ persons, deletePerson }) {
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
              onClick={() => deletePerson(person.id)}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
}
