const reducer = (state = "", action) => {
  switch (action.type) {
    case "FILTER_ON":
      return action.filter;
    default:
      return state;
  }
};

export const handleFilter = (filter) => {
  return {
    type: "FILTER_ON",
    filter,
  };
};

export default reducer;
