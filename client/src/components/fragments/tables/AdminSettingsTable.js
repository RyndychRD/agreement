import { ATable } from "../../adapter";
import { getColumn, getTitle } from "./CommonFunctions";
import "./style.css";

export default function AdminSettingsTable({
	colums = {},
	title = null,
	buttons = ["create", "update", "delete"],
	dataSource = null,
}) {
	const dictColumn = {
		department_id: getColumn("ID", "department_id"),
		department_name: getColumn("Наименование департамента", "department_name"),
	};

	const tableColumns = colums?.data.map((column) => {
		return dictColumn[column] ? dictColumn[column] : null;
	});

	return (
		<ATable
			columns={tableColumns}
			dataSource={dataSource}
			title={() => getTitle(title, buttons)}
		/>
	);
}
