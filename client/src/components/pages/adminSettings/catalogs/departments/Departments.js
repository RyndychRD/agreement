import AdminSettingsTable from "./../../../../fragments/tables/AdminSettingsTable";
import DepartmentService from "./../../../../../services/AdminServices/DepartmentService";
import { GridSpinner } from "../../../../fragments/spinners/Spinner";
import { useState } from "react";

import CreateButtonModel from "./buttonModals/create";
import updateButtonAction from "./buttonModals/update";
import deleteButtonAction from "./buttonModals/delete";

import { useDispatch,useSelector } from "react-redux";
import { openCloseCreateModal } from "./DepartmentsReducer";

export default function Departments() {
	const columns = useSelector((state) => state.departments.columns);
	const dispatch = useDispatch();

	const buttons = {
		create: () => {
			dispatch(openCloseCreateModal());
		},
		update: updateButtonAction,
		delete: deleteButtonAction,
	};

	const [data, setData] = useState(null);
	function prepareForTable(data) {
		return data.map((el) => {
			return { key: el.id, department_id: el.id, department_name: el.name };
		});
	}
	async function getResponse() {
		const response = await DepartmentService.getAll();
		const data = prepareForTable(response.data);
		setData(data);
	}

	if (!data) getResponse();

	return !data ? (
		<GridSpinner />
	) : (
		<>
			<AdminSettingsTable
				buttons={buttons}
				colums={columns}
				// dataSource={data}
				title="Департаменты"
			/>
			<CreateButtonModel />
		</>
	);
}
