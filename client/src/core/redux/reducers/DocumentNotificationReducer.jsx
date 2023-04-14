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
      state.notifications = action.payload;
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
      state.notifications.push(action.payload);
    },
  },
});

export const { setNotifications, readNotification, appendNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
