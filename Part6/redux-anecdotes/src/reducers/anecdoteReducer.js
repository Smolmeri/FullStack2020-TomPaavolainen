import anecdoteService from "../services/anecdotes";

const reducer = (state = [], action) => {
  console.log("what is action", action);
  switch (action.type) {
    case "VOTE":
      const id = action.data.id;
      const toVote = state.find((a) => a.id === id);
      const votedAnecdote = {
        ...toVote,
        votes: toVote.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : votedAnecdote
      );
    case "NEW ANECDOTE":
      return [...state, action.data];

    case "INIT_ANECDOTES":
      return action.data;
    default:
      return state;
  }
};

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.addVote(id);
    dispatch({
      type: "VOTE",
      data: updatedAnecdote,
    });
  };
};

export const createAnecdote = (content) => {
  console.log("anectode content", content);
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: "NEW ANECDOTE",
      data: newAnecdote,
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};

export default reducer;
