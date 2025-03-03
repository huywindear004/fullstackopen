export default function Notification({ message }) {
  if (message === null) {
    return null;
  }
  let className = `notification ${message.state}`;
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="position-relative z-3"
    >
      <div className="toast-container position-absolute top-0 end-0 p-3">
        <div
          className="toast show"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            <img src="..." className="rounded me-2" alt="..." />
            <strong className="me-auto">Bootstrap</strong>
            <small className="text-muted">just now</small>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body">{message.content}</div>
        </div>
      </div>
    </div>
  );
}
