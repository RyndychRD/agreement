import { ATable } from "../../adapter";
import { getColumn } from "./CommonFunctions";

const defaultColums = [
	"document_name",
	"document_updated_at",
	"document_created_at",
];

<<<<<<<< HEAD:client/src/components/fragments/table/table.js
export function GetTable({ colums = defaultColums, tableName = null }) {
========
export default function DocumentControlTable({
	colums = defaultColums,
	tableName = null,
}) {
>>>>>>>> 639f3a90da512759020e94d1fa24b46083f2a890:client/src/components/fragments/tables/DocumentControlTable.js
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
