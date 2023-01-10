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
  created_doc: getItem(
    <NavLink to="/document-control/user-documents/created-documents">
      Созданные мною
    </NavLink>,
    "created-documents"
  ),
  rework_doc: getItem(
    <NavLink to="/document-control/user-documents/rework-documents">
      На доработку
    </NavLink>,
    "rework-documents"
  ),
  approved_doc: getItem(
    <NavLink to="/document-control/user-documents/approved-documents">
      Согласованные
    </NavLink>,
    "approved-documents"
  ),
  completed_doc: getItem(
    <NavLink to="/document-control/user-documents/completed-documents">
      Исполненные
    </NavLink>,
    "completed-documents"
  ),
  rejected_doc: getItem(
    <NavLink to="/document-control/user-documents/rejected-documents">
      Отклоненные
    </NavLink>,
    "rejected-documents"
  ),
  registration_doc: getItem(
    <NavLink to="/document-control/user-documents/registration-documents">
      Регистрация документов
    </NavLink>,
    "registration-documents"
  ),
  admin_all_doc: getItem(
    <NavLink to="/document-control/admin-docs/all-documents">
      Все документы
    </NavLink>,
    "admin-all-doc-documents"
  ),
};

function getLink(LinkKey) {
  return dict[LinkKey] ? dict[LinkKey] : null;
}

export default getLink;
