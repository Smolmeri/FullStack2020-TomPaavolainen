import React from "react";
import Country from "./Country";
import CountryDetails from "./CountryDetails";

const Countries = ({ countries, filter, handleButton }) => {
  const filtered = countries.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (filtered.length > 10 && filter.length > 0) {
    return <div>Too many matches, specify another</div>;
  } else if (filtered.length === 1) {
    return (
      <div>
        <CountryDetails country={filtered[0]} />
      </div>
    );
  } else if (filter.length > 0) {
    return (
      <div>
        {filtered.map((c, i) => (
          <div>
            <Country key={i} country={c} />
            <button onClick={() => handleButton(c.name)}>show</button>
          </div>
        ))}
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Countries;
