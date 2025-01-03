const Total = ({ course }) => {
  const total = course.parts.reduce((acc, part) => acc + part.exercises, 0);
  return <b>Number of exercises: {total}</b>;
};
export default Total;
