/** @format */

import Layout from "antd/es/layout/layout";
import { NavLink } from "react-router-dom";
import { AMenu } from "../../../adapter";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

function getLink(LinkKey) {
  const dict = {
    departments: getItem(
      <NavLink to="/admin-settings/catalogs/departments">Департаменты</NavLink>,
      "departments"
    ),
    users: getItem(
      <NavLink to="/admin-settings/catalogs/users">Пользователи</NavLink>,
      "users"
    ),
    positions: getItem(
      <NavLink to="/admin-settings/catalogs/positions">Должности</NavLink>,
      "positions"
    ),
    rights: getItem(
      <NavLink to="/admin-settings/catalogs/rights">Права</NavLink>,
      "rights"
    ),
  };
  return dict[LinkKey] ? dict[LinkKey] : null;
}

export default function AdminSider() {
  const { Sider: LayoutSider } = Layout;

  const items = [
    getItem("Справочники", "MyCatalogs", null, [
      getLink("departments"),
      getLink("positions"),
      getLink("users"),
      getLink("rights"),
    ]),
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
