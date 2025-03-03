export default function Toast({ message }) {
  if (message === null) {
    return null;
  }

  return (
    <div aria-live="polite" aria-atomic="true" className="position-relative">
      <div className="toast-container top-0 end-0 p-3">
        <div
          className={`toast align-items-center text-bg-${message.type} border-0 show`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">{message.content}</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
}
