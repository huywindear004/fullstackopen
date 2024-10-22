import { useState } from "react";
import "./App.css";

const Button = ({ text, onClickFunc, className }) => {
  return (
    <button className={className} onClick={onClickFunc}>
      {text}
    </button>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td> {value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  let all = good + neutral + bad;
  if (all == 0) return <div>No feedback given</div>;

  let total_score = good * 1 + neutral * 0 + bad * -1;
  let avg_score = total_score / all;
  let positive_percentage = (good / all) * 100;
  return (
    <>
      <table>
        <tbody>
          <StatisticLine text={"Good"} value={good} />
          <StatisticLine text={"Neutral"} value={neutral} />
          <StatisticLine text={"Bad"} value={bad} />
          <StatisticLine text={"All"} value={all} />
          <StatisticLine text={"Average"} value={avg_score} />
          <StatisticLine
            text={"Positive"}
            value={String(positive_percentage) + "%"}
          />
        </tbody>
      </table>
    </>
  );
};

export default function App() {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>GIVE FEEDBACK</h1>
      <Button
        className={"btn_good"}
        text={"Good"}
        onClickFunc={() => setGood(good + 1)}
      />
      <Button
        className={"btn_neutral"}
        text={"Neutral"}
        onClickFunc={() => setNeutral(neutral + 1)}
      />
      <Button
        className={"btn_bad"}
        text={"Bad"}
        onClickFunc={() => setBad(bad + 1)}
      />
      <h1>STATISTICS</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
}
