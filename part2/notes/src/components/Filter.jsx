export default function Filter({ showAll, setShowAll }) {
  const handleShowAll = () => {
    setShowAll(!showAll);
  };
  return (
    <button type="button" onClick={handleShowAll}>
      show {showAll ? "important" : "all"}
    </button>
  );
}
