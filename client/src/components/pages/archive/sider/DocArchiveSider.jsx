/** @format */

import Layout from "antd/es/layout/layout";
import { Menu } from "antd";
import { isAccessGranted } from "../../../../services/userAccessService";
import getLink, { getItem } from "./linkDict";

function getUserDocumentsBlock() {
  return getItem("Архив", "Archive", null, [
    isAccessGranted("DocumentArchive") ? getLink("document_archive") : null,
  ]);
}

export default function Sider() {
  const { Sider: LayoutSider } = Layout;

  const items = [getUserDocumentsBlock()];
  return (
    <LayoutSider theme="dark">
      <Menu
        defaultSelectedKeys={window.location.pathname}
        className="siderMenu"
        mode="inline"
        defaultOpenKeys={["Archive"]}
        items={items}
      />
    </LayoutSider>
  );
}
