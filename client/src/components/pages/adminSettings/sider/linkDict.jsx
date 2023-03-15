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
    "/admin-settings/catalogs/departments"
  ),
  users: getItem(
    <NavLink to="/admin-settings/catalogs/users">Пользователи</NavLink>,
    "/admin-settings/catalogs/users"
  ),
  positions: getItem(
    <NavLink to="/admin-settings/catalogs/positions">Должности</NavLink>,
    "/admin-settings/catalogs/positions"
  ),
  rights: getItem(
    <NavLink to="/admin-settings/catalogs/rights">Права</NavLink>,
    "/admin-settings/catalogs/rights"
  ),
  archiveTypes: getItem(
    <NavLink to="/admin-settings/catalogs/archive-types">Типы архива</NavLink>,
    "/admin-settings/catalogs/archive-types"
  ),
  routes: getItem(
    <NavLink to="/admin-settings/constructor/routes">Маршруты</NavLink>,
    "/admin-settings/constructor/routes"
  ),
  types: getItem(
    <NavLink to="/admin-settings/catalogs/documents/types">
      Типы документов
    </NavLink>,
    "/admin-settings/catalogs/documents/types"
  ),
  forms: getItem(
    <NavLink to="/admin-settings/constructor/forms">Формы</NavLink>,
    "/admin-settings/constructor/forms"
  ),
  logArchive: getItem(
    <NavLink to="/admin-settings/log/archive">Лог архива</NavLink>,
    "/admin-settings/log/archive"
  ),
};

function getLink(LinkKey) {
  return dict[LinkKey] ? dict[LinkKey] : null;
}

export default getLink;
