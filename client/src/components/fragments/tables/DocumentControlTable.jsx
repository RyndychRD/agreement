import { getColumn } from './CommonFunctions'
import { ATable } from '../../adapter'

const defaultColums = [
	'document_name',
	'document_updated_at',
	'document_created_at',
]

export default function DocumentControlTable({
	colums = defaultColums,
	// tableName = null,
}) {
	const dictColumn = {
		document_name: getColumn('Наименование договора', 'document_name'),
		document_updated_at: getColumn(
			'Последние изменения',
			'document_updated_at'
		),
		document_created_at: getColumn(
			'Дата и время создания',
			'document_created_at'
		),
	}

	const tableColumns = colums.map((column) =>
		dictColumn[column] ? dictColumn[column] : null
	)

	return null
	{
		/* // return <ATable columns={tableColumns} /> */
	}
}
