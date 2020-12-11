import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Countries from "./components/Countries";

const App = () => {
  const [countryList, setCountryList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // const [filteredResult, setFilteredResult] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
      setCountryList(res.data);
      console.log("haloo", countryList);
    });
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleButton = (name) => {
    setSearchTerm(name);
  };

  return (
    <div>
      <div>
        find countries <input value={searchTerm} onChange={handleSearch} />
      </div>

      <div>
        <Countries
          countries={countryList}
          filter={searchTerm}
          handleButton={handleButton}
        />
      </div>
    </div>
  );
};

export default App;
