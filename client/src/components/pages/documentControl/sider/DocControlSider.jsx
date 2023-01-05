/** @format */

import Layout from "antd/es/layout/layout";
import { NavLink } from "react-router-dom";
import { AMenu } from "../../../adapter";
import { isAccessGranted } from "../../../../services/userAccessService";

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
    "created-doc": getItem(
      <NavLink to="/document-control/user-documents/created-documents">
        Созданные мною
      </NavLink>,
      "created-documents"
    ),
  };
  return dict[LinkKey] ? dict[LinkKey] : null;
}

export default function Sider() {
  const { Sider: LayoutSider } = Layout;

  const items = [
    getItem("Мои документы", "UserDocuments", null, [
      isAccessGranted("CreatedDocuments") ? getLink("created-doc") : null,
      isAccessGranted("ReworkDocuments")
        ? getItem("На доработку", "FILL_ME")
        : null,
      isAccessGranted("ApprovedDocuments")
        ? getItem("Согласованные", "FILL_ME")
        : null,
      isAccessGranted("CompletedDocuments")
        ? getItem("Исполненные", "FILL_ME")
        : null,
      isAccessGranted("RejectedDocuments")
        ? getItem("Отклоненные", "FILL_ME")
        : null,
      isAccessGranted("OnRegistrationDocuments")
        ? getItem("Регистрация документов", "FILL_ME")
        : null,
    ]),
    getItem("Подписание", "Signing", null, [
      isAccessGranted("ForApprovalDocuments")
        ? getItem("Входящие", "FILL_ME")
        : null,
      isAccessGranted("MySignedForApprovalDocuments")
        ? getItem("Подписанные мною", "FILL_ME")
        : null,
      isAccessGranted("SignedInOOPZDocuments")
        ? getItem("Документы подписанные в ООПЗ", "FILL_ME7")
        : null,
    ]),
    getItem("Задачи", "Tasks", null, [
      isAccessGranted("IncomeTasks") ? getItem("Входящие", "FILL_ME") : null,
    ]),
    getItem("Список (Админ)", "AdminDocs", null, [
      isAccessGranted("Admin") ? getItem("Все документы", "FILL_ME") : null,
    ]),
  ];
  return (
    <LayoutSider theme="dark" collapsible>
      <AMenu
        defaultSelectedKeys={window.location.pathname}
        className="siderMenu"
        mode="inline"
        defaultOpenKeys={["MyDocuments"]}
        items={items}
      />
    </LayoutSider>
  );
}
