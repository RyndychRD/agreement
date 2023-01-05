// import { Tag } from "antd";
import _ from "lodash";
import {
	filterData,
	sorterDate,
	sorterInt,
	sorterStringAlphabet,
} from "../CommonFunctions";

/**
 * Возвращает список колонок для таблицы?. В себе хранит словарь, так как для фильтров нужно указать значения, а эти значения - это все строчки в таблице
 * @param {*} dataSource - Все значения из таблицы для фильтра
 * @param {*} columns - Список запрошенных колонок
 * @returns
 */
export default function getColumns({ dataSource, columns }) {
	/**
	 * Словарь всех возможных колонок для таблицы
	 */

	// Наименование договора | Время создания | Последние изменение | Тип договора | Статус | На подписи | Этап

	const documentColumns = {
		document_id: {
			title: "ID",
			dataIndex: "document_id",
			align: "center",
			sorter: (a, b) => sorterInt(a?.id, b?.id),
		},
		document_status_id: {
			title: "Статус документа",
			dataIndex: "document_status_id",
			align: "center",
			sorter: (a, b) => sorterInt(a?.document_status_id, b?.document_status_id),
		},
		document_type_id: {
			title: "Тип документа",
			dataIndex: "document_type_id",
			align: "center",
			sorter: (a, b) => sorterInt(a?.document_type_id, b?.document_type_id),
		},
		document_creator_id: {
			title: "Создатель",
			dataIndex: "creator_id",
			align: "center",
			sorter: (a, b) => sorterInt(a?.creator_id, b?.creator_id),
		},
		document_name: {
			title: "Наименование договора",
			dataIndex: "name",
			align: "center",
			sorter: (a, b) => sorterStringAlphabet(a?.name, b?.name),
			filters: _?.uniqWith(
				filterData(
					dataSource?.sort((a, b) =>
						a?.document_name?.localeCompare(b?.document_name)
					)
				)((i) => i?.document_name),
				_?.isEqual
			),
			onFilter: (value, record) => record?.document_name?.indexOf(value) === 0,
		},
		document_created_at: {
			title: "Время создание",
			dataIndex: "created_at",
			align: "center",
			sorter: (a, b) => sorterDate(a, b),
			filters: _?.uniqWith(
				filterData(
					dataSource?.sort((a, b) =>
						a?.document_name?.localeCompare(b?.document_name)
					)
				)((i) => i?.document_name),
				_?.isEqual
			),
			onFilter: (value, record) => record?.document_name?.indexOf(value) === 0,
		},
		document_updated_at: {
			title: "Дата обновления",
			dataIndex: "updated_at",
			align: "center",
			sorter: (a, b) => sorterDate(a, b),
			filters: _?.uniqWith(
				filterData(
					dataSource?.sort((a, b) =>
						a?.document_name?.localeCompare(b?.document_name)
					)
				)((i) => i?.document_name),
				_?.isEqual
			),
			onFilter: (value, record) => record?.document_name?.indexOf(value) === 0,
		},
		document_finished_at: {
			title: "Дата завершение",
			dataIndex: "finished_at",
			align: "center",
			sorter: (a, b) => sorterDate(a, b),
			filters: _?.uniqWith(
				filterData(
					dataSource?.sort((a, b) =>
						a?.document_name?.localeCompare(b?.document_name)
					)
				)((i) => i?.document_name),
				_?.isEqual
			),
			onFilter: (value, record) => record?.document_name?.indexOf(value) === 0,
		},
	};

	const dictColumn = {
		...documentColumns,
	};

	/**
	 * Выбрать из словаря все запрошенные колонки
	 */
	return columns?.data?.map((column) =>
		dictColumn[column] ? dictColumn[column] : null
	);
}
