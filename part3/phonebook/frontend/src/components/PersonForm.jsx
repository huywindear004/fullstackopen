export default function PersonForm({
  newName,
  newNumber,
  setNewName,
  setNewNumber,
  onSubmit,
}) {
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-md-6">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Name
            </span>
            <input
              type="text"
              className="form-control"
              aria-describedby="basic-addon1"
              value={newName}
              onChange={handleNameChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon2">
              Number
            </span>
            <input
              type="text"
              className="form-control"
              aria-describedby="basic-addon2"
              value={newNumber}
              onChange={handleNumberChange}
            />
          </div>
        </div>
      </div>

      <div>
        <button className="btn btn-primary w-100" type="submit">
          Add
        </button>
      </div>
    </form>
  );
}
