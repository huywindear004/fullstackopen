export default function Form({ onChange, value }) {
  const handleChange = (event) => {
    onChange(event.target.value);
    console.log(event.target.value);
  };

  return (
    <form>
      <div>
        find countries: <input value={value} onChange={handleChange} />
      </div>
    </form>
  );
}
