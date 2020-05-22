import React, { useState } from 'react';
import './App.css';
import Button from './Button';
import Statistics from './Statistics';




const App = () => {
  // functional state setup
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allFeedback, setAll] = useState([]);
  const [averageSum, setSum] = useState(0);

  // helper functions

  const handleGood = () => {
    setGood(good + 1)
    setAll(allFeedback.concat(good))
    setSum(averageSum + 1);
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setAll(allFeedback.concat(neutral))
    setSum(averageSum + 0);
  }

  const handleBad = () => {
    setBad(bad + 1)
    setAll(allFeedback.concat(bad))
    setSum(averageSum - 1);
  }

  const avg = () => {
    const finalAvg = (averageSum / allFeedback.length);
    return finalAvg;
  }

  const positivePercentage = () => {
    const totalPos = good;
    const perc = Math.round((totalPos / allFeedback.length) * 100);

    return perc + "%";
  }



  return (
    <div>
      <div className="container">
        <h1>Give feedback!</h1>

        <Button handleClick={handleGood} text="Good" color="green" />
        <Button handleClick={handleNeutral} text="Neutral" color="" />
        <Button handleClick={handleBad} text="Bad" color="red" />
      </div>

      <hr />

      <div className="container">

        {allFeedback.length !== 0 &&
          <table>
            <thead>
              <tr>
                <th>Statistics</th>
              </tr>
            </thead>
            <Statistics text="Good" value={good} />
            <Statistics text="Neutral" value={neutral} />
            <Statistics text="Bad" value={bad} />
            <Statistics text="Total" value={allFeedback.length} />
            <Statistics text="Average" value={avg()} />
            <Statistics text="Positive" value={positivePercentage()} />
          </table>
        } {allFeedback.length === 0 &&
          <p>No feedback given</p>
        }
      </div>
    </div>
  );
}

export default App;
