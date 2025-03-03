export default function Filter({ showAll, setShowAll }) {
  const handleShowAll = () => {
    setShowAll(!showAll);
  };
  return (
    <button className="btn btn-primary" type="button" onClick={handleShowAll}>
      show {showAll ? "important" : "all"}
    </button>
  );
}
