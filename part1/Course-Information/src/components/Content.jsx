import Part from "./Part";
const Content = ({ course }) => {
  return (
    <>
      <ul>
        <li>
          <Part part={course.parts[0]} />
        </li>
        <li>
          <Part part={course.parts[1]} />
        </li>
        <li>
          <Part part={course.parts[2]} />
        </li>
      </ul>
    </>
  );
};
export default Content;
