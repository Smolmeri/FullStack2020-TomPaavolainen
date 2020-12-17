import React from "react";

const Error = ({ notification }) => {
  if (notification === null) {
    return null;
  }

  return (
    <div style={wrapperDiv}>
      <div style={styles}>{notification}</div>
    </div>
  );
};

const styles = {
  background: "red",
  border: "3px white solid",
  color: "white",
  padding: "5px",
};

const wrapperDiv = {
  background: "red",
  padding: "5px 5px",
  height: 100,
  width: 100,
  display: "flex",
  flexFlow: "row",
  justifyContent: "center",
  alignItems: "center",
};

export default Error;
