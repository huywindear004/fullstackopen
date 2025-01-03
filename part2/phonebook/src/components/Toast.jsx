export default function Toast({ message }) {
  if (message === null) {
    return null;
  }

  return <div className={"toast " + message.type}>{message.content}</div>;
}
