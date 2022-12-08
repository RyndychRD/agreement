import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../../components/auth/AuthReducer";

export const store = configureStore({
	reducer: {
		session: AuthReducer,
	},
});
