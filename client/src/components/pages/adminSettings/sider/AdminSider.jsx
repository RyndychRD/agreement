/** @format */

import Layout from "antd/es/layout/layout";
import { NavLink } from "react-router-dom";
import { AMenu } from "../../../adapter";
import getLink from "./linkDict";
import { getItem } from "./linkDict";

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
    getItem("Конструкторы", "Constructors", null, [getLink("routes")]),
  ];
  return (
    <LayoutSider theme="dark" collapsible>
      <AMenu
        defaultSelectedKeys={window.location.pathname}
        className="siderMenu"
        mode="inline"
        defaultOpenKeys={["MyCatalogs"]}
        items={items}
      />
    </LayoutSider>
  );
}
