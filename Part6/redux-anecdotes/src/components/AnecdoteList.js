import React from "react";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { connect } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = (props) => {
  const vote = (id) => {
    console.log("vote", id);
    props.voteAnecdote(id);
    props.setNotification(`You voted for: ${id.content}`, 5);
  };

  return (
    <div>
      {props.anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  const sorted = state.anecdotes.sort((a, b) => {
    return b.votes - a.votes;
  });

  return {
    anecdotes: sorted.filter((a) =>
      a.content.toUpperCase().includes(state.filter.toUpperCase())
    ),
  };
};

const mapDispatchToProps = {
  voteAnecdote,
  setNotification,
};

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
export default ConnectedAnecdotes;
