/** @format */

import Layout from "antd/es/layout/layout";
import { AMenu } from "../../../adapter";
import getLink, { getItem } from "./linkDict";

export default function AdminSider() {
  const { Sider: LayoutSider } = Layout;

  const items = [
    getItem("Справочники", "MyCatalogs", null, [
      getLink("departments"),
      getLink("positions"),
      getLink("users"),
      getLink("rights"),
      getLink("types"),
    ]),
    getItem("Конструкторы", "Constructors", null, [
      getLink("routes"),
      getLink("forms"),
    ]),
  ];
  return (
    <LayoutSider theme="dark" collapsible>
      <AMenu
        defaultSelectedKeys={window.location.pathname}
        className="siderMenu"
        mode="inline"
        defaultOpenKeys={["MyCatalogs", "Constructors"]}
        items={items}
      />
    </LayoutSider>
  );
}
