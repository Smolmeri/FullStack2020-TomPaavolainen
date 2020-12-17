import React from "react";

const Form = ({
  checkIfExists,
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={checkIfExists}>
      <div>
        <p>
          Name: <input value={newName} onChange={handleNameChange} />
        </p>
        <p>
          Number: <input value={newNumber} onChange={handleNumberChange} />
        </p>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default Form;
