import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import "antd/dist/reset.css";
import Auth from "./components/auth/Auth";
import { Provider } from "react-redux";
import { store } from "./core/redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<Auth />
		</Provider>
	</React.StrictMode>
);
