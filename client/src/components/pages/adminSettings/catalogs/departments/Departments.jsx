import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import DepartmentService from '../../../../../services/AdminServices/DepartmentService'
import AdminSettingsTable from '../../../../fragments/tables/AdminSettingsTable'

import CreateButtonModel from './buttonModals/create'
import deleteButtonAction from './buttonModals/delete'
import updateButtonAction from './buttonModals/update'

import { openCloseCreateModal } from './DepartmentsReducer'
import GridSpinner from '../../../../fragments/spinners/Spinner'

export default function Departments() {
	const columns = useSelector((state) => state.departments.columns)
	const dispatch = useDispatch()

	const buttons = {
		create: () => {
			dispatch(openCloseCreateModal())
		},
		update: updateButtonAction,
		delete: deleteButtonAction,
	}

	const [data, setData] = useState(null)

	function prepareForTable(_data) {
		return _data.map((el) => ({
			key: el.id,
			department_id: el.id,
			department_name: el.name,
		}))
	}

	async function getResponse() {
		const response = await DepartmentService.getAll()
		const ObjData = prepareForTable(response.data)
		setData(ObjData)
	}

	if (!data) getResponse()

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
	)
}
