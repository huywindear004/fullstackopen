import Part from "./Part";
const Content = ({ course }) => {
  return (
    <>
      <ul>
        {course.parts.map((part) => (
          <Part key={part.id} part={part}></Part>
        ))}
      </ul>
    </>
  );
};
export default Content;
