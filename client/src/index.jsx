/** @format */

import "antd/dist/reset.css";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./components/auth/Auth";
import Layout from "./components/pages/Layout";
import store from "./core/redux/store";
import "./css/index.css";
import "./components/formBuilder/FormBuilderStyle.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route exact path="/login" element={<Auth />} />
        <Route path="/*" element={<Layout />} />
      </Routes>
    </Router>
  </Provider>
);
