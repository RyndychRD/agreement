import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";
import AdminSider from "./sider/AdminSider";
import Catalogs from "./catalogs/Catalogs";
import { isAccessGranted } from "../../../services/userAccessService";
import { Error403, Error404 } from "../Error";

/**
 * Главный компонент, который хранит все элементы админки
 */
export default function AdminSettings() {
  const { Content } = Layout;
  if (!isAccessGranted("Admin")) {
    return Error403();
  }
  return (
    <Layout>
      <AdminSider />
      <Content className="content">
        <Routes>
          <Route path="/catalogs/*" element={<Catalogs />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Content>
    </Layout>
  );
}
