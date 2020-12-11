import React from "react";

const Form = ({
  addName,
  newName,
  newNumber,
  handleFormChange,
  handleNumberChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={addName}>
      <div>
        <p>
          Name: <input value={newName} onChange={handleFormChange} />
        </p>
        <p>
          Number: <input value={newNumber} onChange={handleNumberChange} />
        </p>
      </div>
      <div>
        <button type="submit" onClick={handleSubmit}>
          add
        </button>
      </div>
    </form>
  );
};

export default Form;
