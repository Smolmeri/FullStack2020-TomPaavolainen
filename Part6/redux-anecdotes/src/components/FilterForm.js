import React from "react";
import { useDispatch } from "react-redux";
import { handleFilter } from "../reducers/filterReducer";

const FilterForm = () => {
  const dispatch = useDispatch();
  dispatch(handleFilter(""));

  const handleChange = (event) => {
    event.preventDefault();
    dispatch(handleFilter(event.target.value));
  };
  const style = {
    marginBottom: 10,
    marginTop: 10,
  };
  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default FilterForm;
