import { Layout as ALayout } from "antd";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import MainPage from "./mainPage/MainPage";

import DocumentControl from "./documentControl/DocumentControl";
import AdminSettings from "./adminSettings/AdminSettings";
import { Error404 } from "../fragments/messages/Error";
import Tasks from "./documentControl/tasks/Tasks";
import FAQ from "./FAQ/FAQ";
import Archive from "./archive/Archive";
import Pashalka from "./FAQ/Pashalka";

function Layout() {
  const isAuth = useSelector((state) => state.session.isAuth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("isAuth: ", isAuth);
    if (!isAuth) {
      navigate("/login", {
        state: {
          prev_location: `${location.pathname}?${location.search}`.replace(
            /([?&])+/g,
            "$1"
          ),
        },
      });
    }
  }, [isAuth, location.pathname, location.search, navigate]);

  return (
    <ALayout className="layout">
      <Header />
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/FAQ/*" element={<FAQ />} />
        <Route path="/document-control/*" element={<DocumentControl />} />
        <Route path="/admin-settings/*" element={<AdminSettings />} />
        <Route path="/tasks/*" element={<Tasks />} />
        <Route path="/archive/*" element={<Archive />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Pashalka />
    </ALayout>
  );
}

export default Layout;
