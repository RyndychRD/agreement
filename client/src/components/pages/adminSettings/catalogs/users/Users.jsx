import AdminSettingsTable from "../../../../fragments/tables/AdminSettingsTable";
import React from "react";
export default function Users() {
	const colums = { data: ["department_id", "department_name"] };

	return <AdminSettingsTable colums={colums} title="Пользователи" />;
}
