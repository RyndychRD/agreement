/** @format */

import Layout from "antd/es/layout/layout";
import { Menu } from "antd";
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
      "ProcessingDocuments",
    ])
  )
    return null;
  return getItem("Мои документы", "UserDocuments", null, [
    isAccessGranted("CreatedDocuments") ? getLink("created_doc") : null,
    isAccessGranted("ReworkDocuments") ? getLink("rework_doc") : null,
    isAccessGranted("ApprovedDocuments") ? getLink("approved_doc") : null,
    isAccessGranted("ProcessingDocuments") ? getLink("processing_doc") : null,
    isAccessGranted("CompletedDocuments") ? getLink("completed_doc") : null,
    isAccessGranted("RejectedDocuments") ? getLink("rejected_doc") : null,
  ]);
}

function getSigningBlock() {
  if (
    !isAnyAccessGranted([
      "ForSigningDocuments",
      "MySignedDocuments",
      "OnRegistrationDocuments",
      "SignedInOOPZDocuments",
    ])
  )
    return null;
  return getItem("Подписание", "Signing", null, [
    isAccessGranted("ForSigningDocuments")
      ? getLink("documents_for_signing")
      : null,
    isAccessGranted("MySignedDocuments")
      ? getLink("my_signed_documents")
      : null,

    // prettier-ignore
    isAccessGranted("OnRegistrationDocuments") ? getLink("registration_doc") : null,
    isAccessGranted("SignedInOOPZDocuments") ? getLink("signed_in_oopz") : null,
  ]);
}

function getTaskBlock() {
  if (!isAnyAccessGranted(["IncomeTasks"])) return null;
  return getItem("Задачи", "Tasks", null, [
    isAccessGranted("IncomeTasks") ? getLink("my_tasks") : null,
    isAccessGranted("CompletedTasks") ? getLink("my_completed_tasks") : null,
  ]);
}

function getAdminBlock() {
  if (!isAnyAccessGranted(["Admin"])) return null;
  return getItem("Список (Админ)", "AdminDocs", null, [
    isAccessGranted("Admin") ? getLink("admin_all_doc") : null,
    isAccessGranted("Admin") ? getLink("admin_deleted_doc") : null,
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
    <LayoutSider theme="dark" width="fit-content">
      <Menu
        defaultSelectedKeys={window.location.pathname}
        className="siderMenu"
        mode="inline"
        defaultOpenKeys={["UserDocuments", "Signing", "AdminDocs", "Tasks"]}
        items={items}
      />
    </LayoutSider>
  );
}
