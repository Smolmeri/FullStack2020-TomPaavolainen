import React, { useState } from 'react';
import './App.css';
import Button from './Button';


const App = (props) => {

  // State
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  //Copy of state
  const newVote = [...votes];

  // Find the index of the highest vote value
  let i = newVote.indexOf(Math.max(...newVote));
  console.log(i)


  // Event handlers
  const handleClick = () => {
    setSelected(Math.floor(Math.random() * 6));
  }

  const handleVote = () => {
    newVote[selected] += 1;
    setVotes(newVote);
  }

  return (
    <div>
      <div>
        <p>
        {anecdotes[selected]}
        </p>
      This has {newVote[selected]} votes
        <Button text="Next anecdote" handler={handleClick} />
        <Button text="Vote" handler={handleVote} />
      </div>
      <h1>Most Votes</h1>
      <div>
        <p>
        {anecdotes[i]}
        </p>
          This has {newVote[i]} votes
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

export default App;
