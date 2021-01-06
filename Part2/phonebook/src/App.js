import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import ShowNumbers from "./components/ShowNumbers";
import personsData from "./services/persons";
import Notification from "./components/Notification";
import Error from "./components/Error";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredResult, setFilteredResult] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showNames, setShowNames] = useState(true);
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    personsData.getAll().then((res) => {
      setPersons(res);
    });
  }, []);

  const addPerson = (e) => {
    const phonebookObject = {
      name: newName,
      number: newNumber,
    };

    personsData
      .create(phonebookObject)
      .then((res) => {
        setPersons(persons.concat(res));
        setNotification(`${newName} was added`);
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        console.log(error.response.data);
        setError(`${error.response.data.error}`);
        setTimeout(() => {
          setError(null);
        }, 5000);
      });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const deletePerson = (id) => {
    personsData
      .remove(id)
      .then(() => {
        setPersons(persons.filter((p) => p.id !== id));
        setNotification("Succesfully deleted");
      })
      .catch((error) => {
        setError("This log has already been deleted");
        setTimeout(() => {
          setError(null);
        }, 5000);
      });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleUpdate = (event) => {
    const personsUpdate = persons.find((p) => p.name === newName);
    const updatedPerson = { ...personsUpdate, number: newNumber };
    const id = personsUpdate.id;

    personsData
      .update(id, updatedPerson)
      .then((res) => {
        setPersons(persons.map((p) => (p.id !== id ? p : res)));
        setNotification(`${updatedPerson.name} updated`);
      })
      .catch((error) => {
        setError(
          `${updatedPerson.name} has already been deleted from the server`
        );
        setTimeout(() => {
          setError(null);
        }, 5000);
      });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };
  // const addName = (e) => {
  //   e.preventDefault();
  // };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    value.length <= 0 ? setShowNames(true) : setShowNames(false);
    const filtered = persons.filter((p) =>
      p.name.toLowerCase().includes(searchTerm)
    );
    setFilteredResult(filtered);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleDeleteButton = (id) => {
    const name = persons.find((p) => p.id === id).name;
    if (window.confirm(`Delete ${name}?`)) {
      deletePerson(id);
    }
  };

  const checkIfExists = (e) => {
    e.preventDefault();

    const match = persons.filter(
      (p) => p.name.toUpperCase() === newName.toUpperCase()
    );

    if (match.length > 0) {
      const confirm = window.confirm(
        `${newName} is already in the phonebook, do you want to update the number?`
      );
      if (confirm) {
        handleUpdate();
      }
      setNewNumber("");
      setNewNumber("");
    } else {
      addPerson();
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Error notification={error} />
      <Filter value={searchTerm} handleSearch={handleSearch} />
      <h3>Add a new person</h3>
      <Form
        checkIfExists={checkIfExists}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        // handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>

      <ShowNumbers
        persons={showNames ? persons : filteredResult}
        handleDeleteButton={handleDeleteButton}
      />
    </div>
  );
};

export default App;
