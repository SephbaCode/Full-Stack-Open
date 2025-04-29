import { useState } from 'react';

const Header = ({tittle}) => {
  return <h1>{tittle}</h1>
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StadisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}:</td>
      <td> {value}</td>
    </tr>
  )
}

const Stadistics = ({goodCount, neutralCount, badCount}) => {

  const count = goodCount + neutralCount + badCount;

  if (count > 0) {
    const average = ((goodCount - badCount) / count).toFixed(2);
    const positivePercent = ((goodCount * 100) / count).toFixed(2);
    
    return(
      <div>
        <h1>Stadistics</h1>
        <table>
          <tbody>
            <StadisticLine text="good" value={goodCount} />
            <StadisticLine text="neutral" value={neutralCount} />
            <StadisticLine text="bad" value={badCount} />
            <StadisticLine text="average" value={average} />
            <StadisticLine text="positive percent" value={`${positivePercent}%`} />
            </tbody>
        </table>
      </div>
    )
  }
  return (
    <div>
      <Header tittle='Stadistics'/>
      <p>No feedback given</p>

    </div>
  )
}

const Anecdote = ({ anecdotes, selected }) => {
  return <p>{anecdotes[selected]}</p>;
};



const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [selected, setSelected] = useState(0);
  
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];
  
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  const handleNextAnecdote = () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * anecdotes.length);
    } while (randomIndex === selected); 
    setSelected(randomIndex);
  };

  const handleVoteAnecdote = (selected) => {
    
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  } 

  const mva = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <div>
        <Header tittle="Anecdote of the day" />
        <Anecdote anecdotes={anecdotes} selected={selected} />
        <Button handleClick={() => handleVoteAnecdote(selected)} text="Vote" />
        <Button handleClick={handleNextAnecdote} text="Next anecdote" />
        <p>Votes: {votes[selected]}</p>
        <h2>Most valued anecdote</h2>
        <Anecdote anecdotes={anecdotes} selected={mva} />
        <p>Votes: {votes[mva]}</p>
      </div>
      <div>
        <Header tittle={'Give feedback'} />
        <Button handleClick={handleGoodClick} text="Good" />
        <Button handleClick={handleNeutralClick} text="Neutral" />
        <Button handleClick={handleBadClick} text="Bad" />
      </div>
      <div>
        <Stadistics goodCount={good} neutralCount={neutral} badCount={bad} />
      </div>
    </div>
  );
};

export default App;