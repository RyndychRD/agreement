import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import "antd/dist/reset.css";
import Auth from "./components/auth/Auth";
import { Provider } from "react-redux";
import { store } from "./core/redux/store";
import Layout from "./components/pages/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Provider store={store}>
		<Router>
			<Routes>
				<Route path="/*" element={<Layout />} />
				<Route exact path="/login" element={<Auth />} />
			</Routes>
		</Router>
	</Provider>
);
