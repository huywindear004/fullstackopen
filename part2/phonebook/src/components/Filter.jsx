export default function Filter({ nameFilter, setNameFilter }) {
  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  return (
    <div>
      <div>filter shown with</div>
      <input value={nameFilter} onChange={handleNameFilterChange} />
    </div>
  );
}
