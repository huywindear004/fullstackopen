import { useState, useEffect, useRef } from "react";

import contactServices from "./services/contact";
import PersonList from "./components/PersonList";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Toast from "./components/Toast";

const App = () => {
  const [persons, setPersons] = useState([]);
  const nameInputRef = useRef("");
  const numberInputRef = useRef("");
  const [nameFilter, setNameFilter] = useState("");
  const [message, setMessage] = useState(null);

  console.log("render");

  useEffect(() => {
    contactServices.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const nameInputValue = nameInputRef.current.value;
    const numberInputValue = numberInputRef.current.value;

    // check if name or number is missing
    if (!nameInputValue || !numberInputValue) {
      setMessage({ content: "Name or number is missing", type: "danger" });
      return;
    }

    // check if number is already added
    if (persons.some((p) => p.number === numberInputValue)) {
      setMessage({
        content: `Number ${numberInputValue} is already added to phonebook`,
        type: "danger",
      });
      return;
    }

    // find if the person is already in the phonebook
    // if so, ask to update the number
    const person = persons.find(
      (p) => p.name.toLowerCase() === nameInputValue.toLowerCase()
    );
    if (person) {
      let isUpdate = window.confirm(
        `${person.name} is already added to phonebook, replace the old number with a new one?`
      );

      if (!isUpdate) return;

      const changedPerson = { ...person, number: numberInputValue };
      contactServices
        .update(person.id, changedPerson)
        .then((returnedPerson) => {
          setPersons(
            persons.map((p) => (p.id !== person.id ? p : returnedPerson))
          );
          nameInputRef.current.value = "";
          numberInputRef.current.value = "";
          setMessage({
            content: `Updated ${person.name}'s number`,
            type: "success",
          });
        })
        .catch((error) => {
          setMessage({
            content: error.response.data.error,
            type: "danger",
          });
        });

      return;
    }

    const newPerson = {
      name: nameInputValue,
      number: numberInputValue,
    };
    contactServices
      .create(newPerson)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));

        nameInputRef.current.value = "";
        numberInputRef.current.value = "";

        setMessage({
          content: `Added ${returnedPerson.name}`,
          type: "success",
        });
      })
      .catch((error) => {
        setMessage({
          content: error.response.data.error,
          type: "danger",
        });
      });
  };

  const deletePerson = (id) => {
    let isDelete = window.confirm("Do you really want to delete this person?");

    if (!isDelete) return;

    contactServices.remove(id).then(() => {
      setPersons(persons.filter((person) => person.id !== id));
      setMessage({ content: "Deleted", type: "success" });
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
          nameInputRef={nameInputRef}
          numberInputRef={numberInputRef}
          onSubmit={addPerson}
        />

        <h2>Numbers</h2>
        <Filter nameFilter={nameFilter} setNameFilter={setNameFilter} />

        <PersonList persons={filteredPersons} deletePerson={deletePerson} />
      </div>
    </>
  );
};

export default App;
