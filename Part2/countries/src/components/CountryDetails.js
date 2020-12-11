import React from "react";
import "../App.css";
import Weather from "./Weather";

const CountryDetails = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>

      <h3>Capital city: {country.capital}</h3>
      <h3>Population: {country.population}</h3>

      <h2>Languages</h2>

      {country.languages.map((l, i) => (
        <ul>
          <li key={i}>{l.name}</li>
        </ul>
      ))}
      <div>
        <img className="img" src={country.flag} alt="" />
      </div>
      <Weather city={country.capital} />
    </div>
  );
};

export default CountryDetails;

// TODO: WEATHER REPORT 2.14 https://fullstackopen.com/en/part2/getting_data_from_server
