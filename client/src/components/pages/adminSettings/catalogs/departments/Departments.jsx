/** @format */

import { useDispatch, useSelector } from 'react-redux'
import SimpleSpinner from '../../../../fragments/spinners/Spinner'
import AdminSettingsTable from '../../../../fragments/tables/AdminSettingsTable'

import CreateButtonModel from './buttonModals/create'
import deleteButtonAction from './buttonModals/delete'
import updateButtonAction from './buttonModals/update'

import { openCreateModal } from './DepartmentsReducer'

export default function Departments() {
	const columns = useSelector((state) => state.departments.columns)
	const dispatch = useDispatch()

	const buttons = {
		create: () => {
			dispatch(openCreateModal())
		},
		update: updateButtonAction,
		delete: deleteButtonAction,
	}

	const data = useSelector((state) => state.departments.departmentsList)

	function prepareForTable(rawTableData) {
		try {
			return rawTableData.map((el) => ({
				key: el.id,
				department_id: el.id,
				department_name: el.name,
			}))
		} catch (e) {
			console.log('Ошибка предобработки данных:', e)
			return e
		}
	}

	return !data ? (
		<SimpleSpinner />
	) : (
		<>
			<AdminSettingsTable
				buttons={buttons}
				colums={columns}
				dataSource={data ? prepareForTable(data) : null}
				title='Департаменты'
			/>
			<CreateButtonModel />
		</>
	)
}
