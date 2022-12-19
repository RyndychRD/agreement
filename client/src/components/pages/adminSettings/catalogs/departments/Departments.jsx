import AdminSettingsTable from '../../../../fragments/tables/AdminSettingsTable'
import { SimpleSpinner } from '../../../../fragments/spinners/Spinner'
import React from 'react'

import CreateButtonModel from './buttonModals/create'
import updateButtonAction from './buttonModals/update'
import DeleteButtonAction from './buttonModals/delete'

import { useDispatch, useSelector } from 'react-redux'
import { openCreateModal, openDeleteModal } from './DepartmentsReducer'

export default function Departments() {
	const columns = useSelector((state) => state.departments.columns)
	const dispatch = useDispatch()

	const buttons = {
		create: () => {
			dispatch(openCreateModal())
		},
		update: updateButtonAction,
		delete: () => {
			dispatch(openDeleteModal())
		},
	}

	const data = useSelector((state) => state.departments.departmentsList)

	function prepareForTable(data) {
		try {
			return data.map((el) => {
				return {
					key: el.id,
					department_id: el.id,
					department_name: el.name,
				}
			})
		} catch (e) {
			console.log('Ошибка предобработки данных:', e)
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
				title="Департаменты"
			/>
			<CreateButtonModel />
		</>
	)
}
