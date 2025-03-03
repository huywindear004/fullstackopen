export default function Filter({ nameFilter, setNameFilter }) {
  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  return (
    <div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon3">
          Filter shown with
        </span>
        <input
          type="text"
          className="form-control"
          aria-describedby="basic-addon3"
          value={nameFilter}
          onChange={handleNameFilterChange}
        />
      </div>
    </div>
  );
}
