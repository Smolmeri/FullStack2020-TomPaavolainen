import React from "react";
import { connect } from "react-redux";

const Notification = ({ notification }) => {
  console.log("noti", { notification });
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  };
  return notification ? <div style={style}>{notification}</div> : null;
};

const mapStateToProps = (state) => ({ notification: state.notification });

const connectedNotification = connect(mapStateToProps)(Notification);

export default connectedNotification;
