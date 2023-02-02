import { Layout as ALayout } from "antd";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import MainPage from "./mainPage/MainPage";

import DocumentControl from "./documentControl/DocumentControl";
import AdminSettings from "./adminSettings/AdminSettings";
import { Error404 } from "../fragments/messages/Error";
import Tasks from "./documentControl/tasks/Tasks";

/**
 * Все элементы под хедером хранятся в этом компоненте
 */
function Layout() {
  return (
    <ALayout className="layout">
      <Header />
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/document-control/*" element={<DocumentControl />} />
        <Route path="/admin-settings/*" element={<AdminSettings />} />
        <Route path="/tasks/*" element={<Tasks />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </ALayout>
  );
}

export default Layout;
