import { useState, useEffect } from "react";
import Form from "./components/Form";
import Countries from "./components/Countries";
import countriesService from "./services/countries";

function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [countries, setCountries] = useState([]);
  console.log("main render");

  useEffect(() => {
    console.log("api call");

    countriesService
      .getCountries()
      .then((countries) => setCountries(countries));
  }, []);

  useEffect(() => {
    console.log("search effect");

    const searchKeyWord = search.trim().toLowerCase();
    const filteredResults = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchKeyWord)
    );
    setResults(filteredResults);
  }, [search, countries]);

  return (
    <>
      <Form value={search} onChange={setSearch} />
      <Countries countries={results} setResults={setResults} />
    </>
  );
}

export default App;
