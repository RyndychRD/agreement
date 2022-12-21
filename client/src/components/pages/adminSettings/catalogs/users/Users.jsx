/** @format */

import AdminSettingsTable from "../../../../fragments/tables/AdminSettingsTable";

export default function Users() {
  const columns = { data: ["department_id", "department_name"] };

  return <AdminSettingsTable columns={columns} title="Пользователи" />;
}
