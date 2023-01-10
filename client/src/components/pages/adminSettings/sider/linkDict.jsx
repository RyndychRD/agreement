import { NavLink } from "react-router-dom";

export function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

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
  routes: getItem(
    <NavLink to="/admin-settings/constructor/routes">Маршруты</NavLink>,
    "routes"
  ),
};

function getLink(LinkKey) {
  return dict[LinkKey] ? dict[LinkKey] : null;
}

export default getLink;
