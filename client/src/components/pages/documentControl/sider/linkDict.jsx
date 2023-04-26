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
  approved_doc: getItem(
    <NavLink to="/document-control/user-documents/approved-documents">
      Согласованные
      <NotificationCount type="Approved" />
    </NavLink>,
    "/document-control/user-documents/approved-documents"
  ),
  processing_doc: getItem(
    <NavLink to="/document-control/user-documents/processing-documents">
      Действующие
      <NotificationCount type="ProcessingDocument" />
    </NavLink>,
    "/document-control/user-documents/processing-documents"
  ),
  completed_doc: getItem(
    <NavLink to="/document-control/user-documents/completed-documents">
      Исполненные
      <NotificationCount type="Completed" />
    </NavLink>,
    "/document-control/user-documents/completed-documents"
  ),
  rejected_doc: getItem(
    <NavLink to="/document-control/user-documents/rejected-documents">
      Отклоненные
      <NotificationCount type="Rejected" />
    </NavLink>,
    "/document-control/user-documents/rejected-documents"
  ),
  registration_doc: getItem(
    <NavLink to="/document-control/signing/registration-documents">
      Регистрация документов
      <NotificationCount type="OnRegistration" />
    </NavLink>,
    "/document-control/signing/registration-documents"
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
      <NotificationCount type="SignedOOPZ" />
    </NavLink>,
    "/document-control/signing/signed-in-oopz"
  ),
};

function getLink(LinkKey) {
  return dict[LinkKey] ? dict[LinkKey] : null;
}

export default getLink;
