import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
	name: "session",
	initialState: {
		session: "",
	},
	reducers: {
		setDefaultSession: (state) => {
			state.session = "SESSION";
		},
		createSession: (state, action) => {
			console.log("Посылаем такие данные: ", action.payload);
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(action.payload),
			};
			fetch("http://localhost:3000/auth/", requestOptions)
				.then((response) => response.json())
				.then((data) => console.log("Получаем такой ответ: ", data));
		},
	},
});

// Action creators are generated for each case reducer function
export const { setDefaultSession, createSession } = counterSlice.actions;

export default counterSlice.reducer;
