export default function PersonForm({ nameInputRef, numberInputRef, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-md-6">
          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="basic-addon1">
              Name
            </label>
            <input
              id="basic-addon1"
              type="text"
              className="form-control"
              aria-describedby="basic-addon1"
              ref={nameInputRef}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="basic-addon2">
              Number
            </label>
            <input
              id="basic-addon2"
              type="text"
              className="form-control"
              aria-describedby="basic-addon2"
              ref={numberInputRef}
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
