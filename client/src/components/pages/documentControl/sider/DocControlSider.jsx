/** @format */

import Layout from "antd/es/layout/layout";
import { NavLink } from "react-router-dom";
import { AMenu } from "../../../adapter";
import { isAccessGranted } from "../../../../services/userAccessService";
import getLink, { getItem } from "./linkDict";

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
      <NavLink to="/document-control/created-documents">
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
      isAccessGranted("CreatedDocuments") ? getLink("created_doc") : null,
      isAccessGranted("ReworkDocuments") ? getLink("rework_doc") : null,
      isAccessGranted("ApprovedDocuments") ? getLink("approved_doc") : null,
      isAccessGranted("CompletedDocuments") ? getLink("completed_doc") : null,
      isAccessGranted("RejectedDocuments") ? getLink("rejected_doc") : null,
      // prettier-ignore
      isAccessGranted("OnRegistrationDocuments") ? getLink("registration_doc") : null,
    ]),
    // getItem("Подписание", "Signing", null, [
    //   isAccessGranted("ForApprovalDocuments")
    //     ? getItem("Входящие", "FILL_ME")
    //     : null,
    //   isAccessGranted("MySignedForApprovalDocuments")
    //     ? getItem("Подписанные мною", "FILL_ME")
    //     : null,
    //   isAccessGranted("SignedInOOPZDocuments")
    //     ? getItem("Документы подписанные в ООПЗ", "FILL_ME7")
    //     : null,
    // ]),
    // getItem("Задачи", "Tasks", null, [
    //   isAccessGranted("IncomeTasks") ? getItem("Входящие", "FILL_ME") : null,
    // ]),
    getItem("Список (Админ)", "AdminDocs", null, [
      isAccessGranted("Admin") ? getLink("admin_all_doc") : null,
    ]),
  ];
  return (
    <LayoutSider theme="dark" collapsible>
      <AMenu
        defaultSelectedKeys={window.location.pathname}
        className="siderMenu"
        mode="inline"
        defaultOpenKeys={["UserDocuments"]}
        items={items}
      />
    </LayoutSider>
  );
}
