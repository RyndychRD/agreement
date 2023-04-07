import { NavLink } from "react-router-dom";
import NotificationCount from "./NotificationCount";

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
    "/document-control/user-documents/created-documents"
  ),
  rework_doc: getItem(
    <NavLink to="/document-control/user-documents/rework-documents">
      На доработку
      <NotificationCount type="ReworkDocument" />
    </NavLink>,
    "/document-control/user-documents/rework-documents"
  ),
  approved_doc: getItem(
    <NavLink to="/document-control/user-documents/approved-documents">
      Согласованные
    </NavLink>,
    "/document-control/user-documents/approved-documents"
  ),
  completed_doc: getItem(
    <NavLink to="/document-control/user-documents/completed-documents">
      Исполненные
    </NavLink>,
    "/document-control/user-documents/completed-documents"
  ),
  rejected_doc: getItem(
    <NavLink to="/document-control/user-documents/rejected-documents">
      Отклоненные
    </NavLink>,
    "/document-control/user-documents/rejected-documents"
  ),
  registration_doc: getItem(
    <NavLink to="/document-control/user-documents/registration-documents">
      Регистрация документов
      <NotificationCount type="OnRegistration" />
    </NavLink>,
    "/document-control/user-documents/registration-documents"
  ),
  admin_all_doc: getItem(
    <NavLink to="/document-control/admin-docs/all-documents">
      Все документы
    </NavLink>,
    "/document-control/admin-docs/all-documents"
  ),
  documents_for_signing: getItem(
    <NavLink to="/document-control/signing/documents-for-signing">
      Входящие
      <NotificationCount type="Signing" />
    </NavLink>,
    "/document-control/signing/documents-for-signing"
  ),
  my_signed_documents: getItem(
    <NavLink to="/document-control/signing/my-signed-documents">
      Подписанные мною
    </NavLink>,
    "/document-control/signing/my-signed-documents"
  ),
  my_tasks: getItem(
    <NavLink to="/document-control/tasks/my_tasks">
      Входящие
      <NotificationCount type="IncomeTask" />
    </NavLink>,
    "/document-control/tasks/my_tasks"
  ),
  my_completed_tasks: getItem(
    <NavLink to="/document-control/tasks/my_completed_tasks">
      Выполненные
    </NavLink>,
    "/document-control/tasks/my_completed_tasks"
  ),
  signed_in_oopz: getItem(
    <NavLink to="/document-control/signing/signed-in-oopz">
      Документы, подписанные в ООПЗ
    </NavLink>,
    "/document-control/signing/signed-in-oopz"
  ),
};

function getLink(LinkKey) {
  return dict[LinkKey] ? dict[LinkKey] : null;
}

export default getLink;
