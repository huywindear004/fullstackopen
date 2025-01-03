export default function Notification({ message }) {
  if (message === null) {
    return null;
  }
  let className = `notification ${message.state}`;

  return <div className={className}>{message.content}</div>;
}
