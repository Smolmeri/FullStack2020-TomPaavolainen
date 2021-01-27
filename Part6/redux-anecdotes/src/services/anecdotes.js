import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const addVote = async (anecdote) => {
  const updated = { ...anecdote, votes: anecdote.votes + 1 };
  const url = baseUrl.concat(`/${anecdote.id}`);
  const response = await axios.put(url, updated);
  return response.data;
};

export default {
  getAll,
  createNew,
  addVote,
};
