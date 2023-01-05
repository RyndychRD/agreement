import { Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import Sider from "./sider/DocControlSider";
import "../../../css/index.css";
import { Error404 } from "../../fragments/messages/Error";
import UserDocuments from "./userDocuments/UserDocuments";
import Signing from "./signing/Signing";
import Tasks from "./tasks/Tasks";
import AdminDocs from "./adminDocs/AdminDocs";

export default function DocumentControl() {
  const { Content } = Layout;
  return (
    <Layout>
      <Sider />
      <Content className="content">
        <Routes>
          <Route path="/user-documents/*" element={<UserDocuments />} />
          <Route path="/signing/*" element={<Signing />} />
          <Route path="/tasks/*" element={<Tasks />} />
          <Route path="/admin-docs/*" element={<AdminDocs />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Content>
    </Layout>
  );
}
