import { ATable } from '../../adapter'
import { getColumn, getTitle } from './CommonFunctions'
import './style.css'

const buttonDefault = {
	create: () => {
		console.log('Create button pushed, no action provided')
	},
	update: () => {
		console.log('Update button pushed, no action provided')
	},
	delete: () => {
		console.log('Delete button pushed, no action provided')
	},
}

export default function AdminSettingsTable({
	colums = {},
	title = null,
	buttons = buttonDefault,
	dataSource = null,
}) {
	const dictColumn = {
		department_id: getColumn('ID', 'department_id'),
		department_name: getColumn('Наименование департамента', 'department_name'),
	}

	const tableColumns = colums?.data.map((column) =>
		dictColumn[column] ? dictColumn[column] : null
	)

	return (
		<ATable
			columns={tableColumns}
			dataSource={dataSource}
			pagination={{ position: ['bottomCenter'] }}
			className="height-100"
			title={() => getTitle(title, buttons)}
		/>
	)
}
