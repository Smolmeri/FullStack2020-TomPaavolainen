const NotificationReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.data;
    case "HIDE":
      return null;
    default:
      return state;
  }
};

export const setNotification = (content, timer) => {
  if (window.notificationTimeout) {
    window.clearTimeout(window.notificationTimeout);
  }

  return async (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      data: content,
    });

    window.notificationTimeout = setTimeout(
      () =>
        dispatch({
          type: "HIDE",
        }),
      timer * 1000
    );
  };
};

export default NotificationReducer;
