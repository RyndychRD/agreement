import { ATable } from "../../adapter";

function getColumn(title, dataIndex, sorter, defaultSortOrder) {
	return {
		title,
		dataIndex,
		// sorter,
		// defaultSortOrder
	};
}

const defaultColums = [
	"document_name",
	"document_updated_at",
	"document_created_at",
];

export function GetTable({ colums = defaultColums, tableName = null }) {
	const dictColumn = {
		document_name: getColumn("Наименование договора", "document_name"),
		document_updated_at: getColumn(
			"Последние изменения",
			"document_updated_at"
		),
		document_created_at: getColumn(
			"Дата и время создания",
			"document_created_at"
		),
	};

	const tableColumns = colums.map((column) => {
		return dictColumn[column] ? dictColumn[column] : null;
	});

	return <ATable columns={tableColumns} />;
}
