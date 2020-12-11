import React from "react";

const ShowNumbers = ({ persons }) => {
  return (
    <div>
      <ul>
        {persons.map((p, i) => (
          <p key={i}>
            {p.name} {p.number}
          </p>
        ))}
      </ul>
    </div>
  );
};

export default ShowNumbers;
