import { useState, useEffect } from "react";

import contactServices from "./services/contact";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Toast from "./components/Toast";
import "./assets/css/App.css";

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
    if (persons.some((p) => p.name === newName)) {
      let isUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (isUpdate) {
        const person = persons.find((p) => p.name === newName);
        const changedPerson = { ...person, number: newNumber };
        contactServices
          .update(person.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) => (p.id !== person.id ? p : returnedPerson))
            );
            setMessage({ content: `Updated ${newName}`, type: "success" });
          })
          .catch(() => {
            setMessage({
              content: `Information of ${newName} has already been removed from server`,
              type: "error",
            });
            setPersons(persons.filter((p) => p.id !== person.id));
          });
      }
      return;
    }
    if (persons.some((p) => p.number === newNumber)) {
      setMessage({
        content: `Number ${newNumber} is already added to phonebook`,
        type: "error",
      });
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };
    contactServices.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
    });
    setNewName("");
    setNewNumber("");
    setMessage({ content: `Added ${newName}`, type: "success" });
  };

  const filteredPersons = persons.filter((p) =>
    p.name.toLowerCase().includes(nameFilter.toLowerCase())
  );

  setTimeout(() => {
    setMessage(null);
  }, 5000);

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <Filter nameFilter={nameFilter} setNameFilter={setNameFilter} />
        <h2>add a new</h2>
        <PersonForm
          newName={newName}
          newNumber={newNumber}
          setNewName={setNewName}
          setNewNumber={setNewNumber}
          onSubmit={addPerson}
        />

        <h2>Numbers</h2>
        <Persons
          persons={filteredPersons}
          setPersons={setPersons}
          setMessage={setMessage}
        />
      </div>
      <Toast message={message} />
    </>
  );
};

export default App;
