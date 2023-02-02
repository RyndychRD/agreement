/** @format */

import Layout from "antd/es/layout/layout";
import { AMenu } from "../../../adapter";
import {
  isAccessGranted,
  isAnyAccessGranted,
} from "../../../../services/userAccessService";
import getLink, { getItem } from "./linkDict";

function getUserDocumentsBlock() {
  if (
    !isAnyAccessGranted([
      "CreatedDocuments",
      "ReworkDocuments",
      "ApprovedDocuments",
      "CompletedDocuments",
      "RejectedDocuments",
    ])
  )
    return null;
  return getItem("Мои документы", "UserDocuments", null, [
    isAccessGranted("CreatedDocuments") ? getLink("created_doc") : null,
    isAccessGranted("ReworkDocuments") ? getLink("rework_doc") : null,
    isAccessGranted("ApprovedDocuments") ? getLink("approved_doc") : null,
    isAccessGranted("CompletedDocuments") ? getLink("completed_doc") : null,
    isAccessGranted("RejectedDocuments") ? getLink("rejected_doc") : null,
    // prettier-ignore
    isAccessGranted("OnRegistrationDocuments") ? getLink("registration_doc") : null,
  ]);
}

function getSigningBlock() {
  if (!isAnyAccessGranted(["ForSigningDocuments", "MySignedDocuments"]))
    return null;
  return getItem("Подписание", "Signing", null, [
    isAccessGranted("ForSigningDocuments")
      ? getLink("documents_for_signing")
      : null,
    isAccessGranted("MySignedDocuments")
      ? getLink("my_signed_documents")
      : null,
    // isAccessGranted("SignedInOOPZDocuments")
    //   ? getItem("Документы подписанные в ООПЗ", "FILL_ME7")
    //   : null,
  ]);
}

function getTaskBlock() {
  if (!isAnyAccessGranted(["IncomeTasks"])) return null;
  return getItem("Задачи", "Tasks", null, [
    isAccessGranted("IncomeTasks") ? getLink("my_tasks") : null,
  ]);
}

function getAdminBlock() {
  if (!isAnyAccessGranted(["Admin"])) return null;
  return getItem("Список (Админ)", "AdminDocs", null, [
    isAccessGranted("Admin") ? getLink("admin_all_doc") : null,
  ]);
}

export default function Sider() {
  const { Sider: LayoutSider } = Layout;

  const items = [
    getUserDocumentsBlock(),
    getSigningBlock(),
    getTaskBlock(),
    getAdminBlock(),
  ];
  return (
    <LayoutSider theme="dark" collapsible>
      <AMenu
        defaultSelectedKeys={window.location.pathname}
        className="siderMenu"
        mode="inline"
        defaultOpenKeys={["UserDocuments", "Signing", "AdminDocs", "Tasks"]}
        items={items}
      />
    </LayoutSider>
  );
}
