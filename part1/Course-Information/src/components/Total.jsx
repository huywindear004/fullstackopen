const Total = ({ course }) => {
  const total = course.parts.reduce((acc, part) => acc + part.exercises, 0);
  return <p>Number of exercises: {total}</p>;
};
export default Total;
