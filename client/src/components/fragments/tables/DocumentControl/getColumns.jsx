// import { Tag } from "antd";
import _ from "lodash";
import {
  filterData,
  filterDataStringSorted,
  renderDate,
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
      defaultSortOrder: "ascend",
      sorter: (a, b) => sorterInt(a?.document_id, b?.document_id),
    },

    document_name: {
      title: "Наименование договора",
      dataIndex: "document_name",
      align: "center",
      sorter: (a, b) =>
        sorterStringAlphabet(a?.document_name, b?.document_name),
      filters: filterDataStringSorted(dataSource, "document_name"),
      onFilter: (value, record) => record?.document_name?.indexOf(value) === 0,
    },

    document_created_at: {
      title: "Дата и время создание",
      dataIndex: "document_created_at",
      align: "center",
      sorter: (a, b) => sorterDate(a, b),
      render: (value) => renderDate(value),
    },
    document_updated_at: {
      title: "Последние изменение",
      dataIndex: "document_updated_at",
      align: "center",
      sorter: (a, b) => sorterDate(a, b),
      render: (value) => renderDate(value),
    },
    document_finished_at: {
      title: "Дата завершение",
      dataIndex: "document_finished_at",
      align: "center",
      sorter: (a, b) => sorterDate(a, b),
      render: (value) => renderDate(value),
    },

    document_status: {
      title: "Статус",
      dataIndex: "document_status",
      align: "center",
      sorter: (a, b) =>
        sorterStringAlphabet(a?.document_status, b?.document_status),
      filters: filterDataStringSorted(dataSource, "document_status"),
      onFilter: (value, record) =>
        record?.document_status?.indexOf(value) === 0,
    },
    document_type: {
      title: "Тип договора",
      dataIndex: "document_type",
      align: "center",
      sorter: (a, b) =>
        sorterStringAlphabet(a?.document_type, b?.document_type),
      filters: filterDataStringSorted(dataSource, "document_type"),
      onFilter: (value, record) => record?.document_type?.indexOf(value) === 0,
    },
    document_creator: {
      title: "Создатель",
      dataIndex: "document_creator",
      align: "center",
      sorter: (a, b) =>
        sorterStringAlphabet(a?.document_creator, b?.document_creator),
      filters: filterDataStringSorted(dataSource, "document_creator"),
      onFilter: (value, record) => record?.document_creator?.indexOf(value) === 0,
    },
    document_current_signer: {
      title: "На подписи (доделать)",
      dataIndex: "document_current_signer",
      align: "center",
    },
    document_stage: {
      title: "Этап (доделать)",
      dataIndex: "document_stage",
      align: "center",
    },
  };

  const dictColumn = {
    ...documentColumns,
  };

  /**
   * Выбрать из словаря все запрошенные колонки
   */
  return columns?.data?.map((column) =>
    dictColumn[column] ? dictColumn[column] : {}
  );
}
