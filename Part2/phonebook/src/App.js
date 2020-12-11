import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import ShowNumbers from "./components/ShowNumbers";

import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredResult, setFilteredResult] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showNames, setShowNames] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((res) => {
      setPersons(res.data);
    });
  }, []);

  const addName = (e) => {
    e.preventDefault();
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    value.length <= 0 ? setShowNames(true) : setShowNames(false);
    const filtered = persons.filter((p) =>
      p.name.toLowerCase().includes(searchTerm)
    );
    setFilteredResult(filtered);
  };

  const handleFormChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    persons.includes(newName)
      ? alert(`${newName} is already added to the phonebook`)
      : setPersons([...persons, { name: newName, number: newNumber }]);
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchTerm} handleSearch={handleSearch} />
      <Form
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleFormChange={handleFormChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>

      <ShowNumbers persons={showNames ? persons : filteredResult} />
    </div>
  );
};

export default App;
