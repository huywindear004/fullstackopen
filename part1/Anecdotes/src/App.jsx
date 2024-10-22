import { useState } from "react";
import "./App.css";

const randInt = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const Button = ({ text, onClickFunc }) => {
  return <button onClick={onClickFunc}>{text}</button>;
};

const indexOfMax = (arr) => {
  let arrLength = arr.length;
  if (arrLength == 0) return -1;
  let max = arr[0];
  let maxIndex = 0;
  for (let i = 1; i < arrLength; i++) {
    if (arr[i] > max) {
      max = arr[i];
      maxIndex = i;
    }
  }
  return maxIndex;
};

const MostVotedAnecdote = ({ anecdotes, votes }) => {
  return <>{anecdotes[indexOfMax(votes)]}</>;
};

const anecdotes = [
  "If it hurts, do it more often.",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  "The only way to go fast, is to go well.",
];
const App = () => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const changeAnecdotes = () => {
    setSelected(randInt(0, anecdotes.length));
  };

  const changeVotes = () => {
    const copyVotes = [...votes];
    copyVotes[selected] += 1;
    setVotes(copyVotes);
  };

  return (
    <>
      <h2>Anecdote of the day</h2>
      <div className="anecdotes">{anecdotes[selected]}</div>
      <div className="vote_info">Has {votes[selected]} votes</div>
      <div className="btn_container">
        <Button text={"Next anecdotes"} onClickFunc={changeAnecdotes} />
        <Button text={"Vote"} onClickFunc={changeVotes} />
      </div>
      <h2>Anecdote with most votes</h2>
      <MostVotedAnecdote anecdotes={anecdotes} votes={votes} />
    </>
  );
};

export default App;
