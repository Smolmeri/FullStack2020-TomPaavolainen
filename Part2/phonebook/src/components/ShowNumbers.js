import React from "react";

const ShowNumbers = ({ persons, handleDeleteButton }) => {
  return (
    <div>
      <ul>
        {persons.map((person, i) => (
          <p key={i}>
            {person.name} {person.number}
            <button onClick={() => handleDeleteButton(person.id)}>
              delete
            </button>
          </p>
        ))}
      </ul>
    </div>
  );
};

export default ShowNumbers;
