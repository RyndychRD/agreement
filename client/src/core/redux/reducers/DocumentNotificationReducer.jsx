/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      console.log(action.payload);
      state.notifications = action.payload;
      console.log(state.notifications);
    },
    readNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (el) =>
          !(
            el.notification_type === action.payload.notificationType &&
            el.element_id === action.payload.elementId
          )
      );
    },
    appendNotification: (state, action) => {
      console.log(action.payload);
      state.notifications.push(action.payload);
      console.log(state.notifications);
    },
  },
});

export const { setNotifications, readNotification, appendNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
