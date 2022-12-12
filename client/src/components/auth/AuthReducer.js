import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "./../../services/AuthService";

// Создаем преобразователя
export const loginAsync = createAsyncThunk(
	"AuthSlice/login",
	async (action, thunkAPI) => {
		try {
			console.log("console.log(action)", action);
			const response = await AuthService.login(action.login, action.password);
			console.log("console.log(response);", await response);
			localStorage.setItem("token", await response.data.accessToken);
			return await response.data;
		} catch (error) {
			console.log(error.response.data.message);
		}
	}
);

export const logoutAsync = createAsyncThunk("AuthSlice/logout", async () => {
	try {
		console.log("logoutAsync");
		await AuthService.logout();
	} catch (error) {
		console.log(error.response.data.message);
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
				console.log("console.log(state)", state);
				console.log("console.log(action)", action);
				if (action.payload?.user) {
					state.current_user = action.payload.user;
					state.session = action.payload.accessToken;
					state.isAuth = true;
				} else {
					state.isAuth = false;
				}
			} catch (error) {
				console.log(error);
			}
		},
		[logoutAsync.fulfilled]: (state, action) => {
			try {
				console.log("logoutAsync.fulfilled");
				localStorage.removeItem("token");
				state.current_user = {};
				state.session = {};
				state.isAuth = false;
			} catch (error) {
				console.log(error);
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
