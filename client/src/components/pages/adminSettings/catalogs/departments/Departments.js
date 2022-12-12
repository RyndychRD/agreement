import AdminSettingsTable from "./../../../../fragments/tables/AdminSettingsTable";
import DepartmentService from "./../../../../../services/AdminServices/DepartmentService";
import { GridSpinner } from "../../../../fragments/spinners/Spinner";
import { useState } from "react";
export default function Departments() {
	const colums = { data: ["department_id", "department_name"] };
	const [data, setData] = useState(null);

	function prepareForTable(data) {
		return data.map((el) => {
			return { key: el.id, department_id: el.id, department_name: el.name };
		});
	}

	async function getResponse() {
		const response = await DepartmentService.getAll();
		console.log(response);
		setData(prepareForTable(response.data));
	}

	if (!data) getResponse();

	return !data ? (
		<GridSpinner />
	) : (
		<AdminSettingsTable
			colums={colums}
			dataSource={data}
			title="Департаменты"
		/>
	);
}
