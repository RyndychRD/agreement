import { Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import CreatedDocument from "./createdDocuments/CreatedDocuments";
import Sider from "./sider/DocControlSider";
import "../../../css/index.css";
import { Error404 } from "../../fragments/messages/Error";

export default function DocumentControl() {
  const { Content } = Layout;
  return (
    <Layout className="content">
      <Sider>
        <Content>
          <Routes>
            <Route path="/created-documents" element={<CreatedDocument />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </Content>
      </Sider>
    </Layout>
  );
}
