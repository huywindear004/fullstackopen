import Weather from "./Weather";

export default function Countries({ countries, setResults }) {
  const handleShow = (country) => {
    setResults([country]);
  };

  if (countries.length >= 10) {
    return <div>Too many matches, specify another filter</div>;
  }
  if (countries.length > 1) {
    return (
      <div>
        {countries.map((country) => (
          <div key={country.name.common}>
            <span>{country.name.common}</span>
            <button type="button" onClick={() => handleShow(country)}>
              show
            </button>
          </div>
        ))}
      </div>
    );
  }
  if (countries.length === 1) {
    const country = countries[0];
    return (
      <>
        <div>
          <h1>{country.name.common}</h1>
          <div>capital: {country.capital[0]}</div>
          <div>area: {country.area}</div>
          <h2>languages</h2>
          <ul>
            {Object.values(country.languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img src={country.flags.png} alt={country.name.common} />
        </div>
        <div>
          <Weather city={country.capital[0]} />
        </div>
      </>
    );
  }
  return <div>No countries found</div>;
}
