/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import AuthService from "../../../services/AuthService";
import { API_URL } from "../../../http";
import { saveUserRights } from "../../../services/userAccessService";
import WebSocketSingleton from "../../socket/WebSocket";

// Создаем преобразователя
export const loginAsync = createAsyncThunk(
  "AuthSlice/login",
  async (action) => {
    try {
      const response = await AuthService.login(action.login, action.password);
      document.cookie = `refreshToken=${response.data.refreshToken}`;
      localStorage.setItem("token", await response.data.accessToken);
      saveUserRights({ user: response.data.user });
      return response.data;
    } catch (error) {
      return error.response?.data?.message;
    }
  }
);

export const refreshAsync = createAsyncThunk("AuthSlice/refresh", async () => {
  try {
    const response = await axios.get(`${API_URL}/refresh`, {
      withCredentials: true,
    });
    localStorage.setItem("token", await response.data.accessToken);
    saveUserRights({ user: response.data.user });
    // eslint-disable-next-line no-console
    console.log("Токен успешно обновлен,входим в систему.");
    return await response.data;
  } catch (error) {
    // console.log(error.response?.data?.message)
    return error.response?.data?.message;
  }
});

export const logoutAsync = createAsyncThunk("AuthSlice/logout", async () => {
  try {
    // console.log('logoutAsync')
    await AuthService.logout();
    window.location.href = "/login";
    window.location.reload();
    return "Выход произведён";
  } catch (error) {
    // console.log(error.response?.data?.message)
    return error.response?.data?.message;
  }
});

export const AuthSlice = createSlice({
  name: "session",
  initialState: {
    loading: "idle",
    current_user: null,
    isAuth: false,
    session: "",
  },
  reducers: {},
  extraReducers: {
    // setDefaultSession: (state) => {
    // 	state.session = "SESSION";
    // },
    [loginAsync.fulfilled]: (state, action) => {
      try {
        if (action.payload?.user) {
          state.current_user = action.payload.user;
          state.session = action.payload.accessToken;
          state.isAuth = true;
          const ws = new WebSocketSingleton();
          ws.send("Hello world, login");
        } else {
          state.isAuth = false;
        }
      } catch (error) {
        // console.log(error)
      }
    },
    [logoutAsync.fulfilled]: (state) => {
      try {
        localStorage.removeItem("token");
        state.current_user = {};
        state.session = {};
        state.isAuth = false;
      } catch (error) {
        // console.log(error)
      }
    },
    [refreshAsync.fulfilled]: (state, action) => {
      try {
        if (action.payload?.user) {
          state.current_user = action.payload.user;
          state.session = action.payload.accessToken;
          state.isAuth = true;
          const ws = new WebSocketSingleton();
          ws.send("Hello world, refresh");
        } else {
          state.isAuth = false;
        }
      } catch (error) {
        // console.log(error)
      }
    },
    // registration(state, action) {
    // 	try {
    // 		const response = await AuthService.registration(
    // 			action.payload.login,
    // 			action.payload.password
    // 		);
    // 		localStorage.setItem("token", response.data.accessToken);
    // 		state.current_user(response.data.user);
    // 		state.session(response.data.accessToken);
    // 		state.isAuth(true);
    // 	} catch (error) {
    // 		console.log(error.response?.data?.message);
    // 	}
    // },
  },
});

// export const { registration, logout } = AuthSlice.actions;

export default AuthSlice.reducer;
