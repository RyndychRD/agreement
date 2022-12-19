import AdminSettingsTable from '../../../../fragments/tables/AdminSettingsTable'

export default function Positions() {
	const colums = { data: ['department_id', 'department_name'] }

	return <AdminSettingsTable colums={colums} title="Должности" />
}
