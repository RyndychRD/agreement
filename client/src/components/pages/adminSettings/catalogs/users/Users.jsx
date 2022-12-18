import AdminSettingsTable from "../../../../fragments/tables/AdminSettingsTable";
export default function Users() {
	const colums = { data: ["department_id", "department_name"] };

	return <AdminSettingsTable colums={colums} title="Пользователи" />;
}
