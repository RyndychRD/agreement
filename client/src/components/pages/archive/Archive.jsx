import { Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import Sider from "./sider/DocArchiveSider";
import "../../../css/index.css";
import { Error404 } from "../../fragments/messages/Error";
import DocumentArchive from "./documentArchive/DocumentArchive";
import MainSocket from "../../../core/socket/mainSocket/MainSocket";

export default function Archive() {
  const { Content } = Layout;
  MainSocket();
  return (
    <Layout>
      <Sider />
      <Content className="content">
        <Routes>
          <Route path="/document-archive" element={<DocumentArchive />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Content>
    </Layout>
  );
}
