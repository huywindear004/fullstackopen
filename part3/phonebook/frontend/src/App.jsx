import { useState, useEffect } from "react";

import contactServices from "./services/contact";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Toast from "./components/Toast";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    contactServices.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    if (!newName || !newNumber) {
      setMessage({ content: "Name or number is missing", type: "danger" });
      return;
    }

    if (persons.some((p) => p.number === newNumber)) {
      setMessage({
        content: `Number ${newNumber} is already added to phonebook`,
        type: "danger",
      });
      return;
    }

    const person = persons.find((p) => p.name === newName);
    if (person) {
      let isUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (!isUpdate) return;

      const changedPerson = { ...person, number: newNumber };
      contactServices
        .update(person.id, changedPerson)
        .then((returnedPerson) => {
          setPersons(
            persons.map((p) => (p.id !== person.id ? p : returnedPerson))
          );
          setNewName("");
          setNewNumber("");
          setMessage({ content: `Updated ${newName}`, type: "success" });
        })
        .catch(() => {
          setMessage({
            content: `Could not update ${newName}'s number`,
            type: "danger",
          });
        });

      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };
    contactServices
      .create(personObject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));

        setNewName("");
        setNewNumber("");
        setMessage({ content: `Added ${newName}`, type: "success" });
      })
      .catch(() => {
        setMessage({
          content: `Could not add ${newName}`,
          type: "danger",
        });
      });
  };

  const filteredPersons = persons.filter((p) =>
    p.name.toLowerCase().includes(nameFilter.toLowerCase())
  );

  return (
    <>
      <Toast message={message} />
      <h1 className="text-center text-bg-dark">Phonebook</h1>
      <div className="container">
        <h2>Add a new contact</h2>
        <PersonForm
          newName={newName}
          newNumber={newNumber}
          setNewName={setNewName}
          setNewNumber={setNewNumber}
          onSubmit={addPerson}
        />

        <h2>Numbers</h2>
        <Filter nameFilter={nameFilter} setNameFilter={setNameFilter} />

        <Persons
          persons={filteredPersons}
          setPersons={setPersons}
          setMessage={setMessage}
        />
      </div>
    </>
  );
};

export default App;
