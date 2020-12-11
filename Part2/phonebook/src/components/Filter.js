import React from "react";

const Filter = ({ value, handleSearch }) => {
  return (
    <div>
      Filter: <input value={value} onChange={handleSearch} />
    </div>
  );
};

export default Filter;
