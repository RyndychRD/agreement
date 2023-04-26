// import { Tag } from "antd";

import {
  filterDataStringSorted,
  filterDateLogic,
  filterDateYearly,
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

  const documentColumns = {
    document_id: {
      title: "ID",
      dataIndex: "document_id",
      align: "center",
      defaultSortOrder: "descend",
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
      title: "Дата и время создания",
      dataIndex: "document_created_at",
      align: "center",
      sorter: (a, b) => sorterDate(a, b),
      render: (value) => renderDate(value),
      filters: filterDateYearly(dataSource, "document_created_at"),
      onFilter: (value, record) =>
        filterDateLogic(value, record, "document_created_at"),
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
      onFilter: (value, record) =>
        record?.document_creator?.indexOf(value) === 0,
    },
    document_current_signer: {
      title: "На подписи",
      dataIndex: "document_current_signer",
      align: "center",
      sorter: (a, b) =>
        sorterStringAlphabet(
          a?.document_current_signer,
          b?.document_current_signer
        ),
      filters: filterDataStringSorted(dataSource, "document_current_signer"),
      onFilter: (value, record) =>
        record?.document_current_signer?.indexOf(value) === 0,
    },
    document_stage: {
      title: "Этап",
      dataIndex: "document_stage",
      align: "center",
    },
    document_remark: {
      title: "Причина отклонения",
      dataIndex: "document_remark",
      align: "center",
    },
  };

  const documentArchive = {
    document_archive_type_name: {
      title: "Тип архива",
      dataIndex: "document_archive_type_name",
      align: "center",
      sorter: (a, b) =>
        sorterStringAlphabet(
          a?.document_archive_type_name,
          b?.document_archive_type_name
        ),
      filters: filterDataStringSorted(dataSource, "document_archive_type_name"),
      onFilter: (value, record) =>
        record?.document_archive_type_name?.indexOf(value) === 0,
    },
    document_passed_to_archive_at: {
      title: "Дата помещения в архив",
      dataIndex: "document_passed_to_archive_at",
      align: "center",
      sorter: (a, b) => sorterDate(a, b),
      render: (value) => renderDate(value),
      filters: filterDateYearly(dataSource, "document_passed_to_archive_at"),
      onFilter: (value, record) =>
        filterDateLogic(value, record, "document_passed_to_archive_at"),
    },
  };

  const documentTaskColumns = {
    document_task_id: {
      title: "ID",
      dataIndex: "document_task_id",
      align: "center",
      defaultSortOrder: "descend",
      sorter: (a, b) => sorterInt(a?.document_task_id, b?.document_task_id),
    },
    document_task_creator: {
      title: "ФИО поручителя",
      dataIndex: "document_task_creator",
      align: "center",
      sorter: (a, b) =>
        sorterStringAlphabet(
          a?.document_task_creator,
          b?.document_task_creator
        ),
      filters: filterDataStringSorted(dataSource, "document_creator"),
      onFilter: (value, record) =>
        record?.document_task_creator?.indexOf(value) === 0,
    },
    document_task_executor: {
      title: "Исполнитель",
      dataIndex: "document_task_executor",
      align: "center",
      sorter: (a, b) =>
        sorterStringAlphabet(
          a?.document_task_executor,
          b?.document_task_executor
        ),
      filters: filterDataStringSorted(dataSource, "document_task_executor"),
      onFilter: (value, record) =>
        record?.document_task_executor?.indexOf(value) === 0,
    },
    document_assigned_document_tasks_complete_rate: {
      title: "Поручения Выполненные/Порученные",
      dataIndex: "document_assigned_document_tasks_complete_rate",
      align: "center",
    },
    document_tasks_type_3_status: {
      title: "Поручение",
      dataIndex: "document_tasks_type_3_status",
      align: "center",
      sorter: (a, b) =>
        sorterStringAlphabet(
          a?.document_task_executor,
          b?.document_task_executor
        ),
      filters: filterDataStringSorted(dataSource, "document_task_executor"),
      onFilter: (value, record) =>
        record?.document_task_executor?.indexOf(value) === 0,
    },
    document_task_created_at: {
      title: "Дата и время создания",
      dataIndex: "document_task_created_at",
      align: "center",
      sorter: (a, b) => sorterDate(a, b),
      render: (value) => renderDate(value),
    },
    document_task_finished_at: {
      title: "Дата и время завершения",
      dataIndex: "document_task_finished_at",
      align: "center",
      sorter: (a, b) => sorterDate(a, b),
      render: (value) => renderDate(value),
    },
    document_task_due_at: {
      title: "Выполнить до",
      dataIndex: "document_task_due_at",
      align: "center",
      sorter: (a, b) => sorterDate(a, b),
      render: (value) => renderDate(value, false),
    },
    document_task_status: {
      title: "Статус",
      dataIndex: "document_task_status",
      align: "center",
      sorter: (a, b) =>
        sorterStringAlphabet(a?.document_task_status, b?.document_task_status),
      filters: filterDataStringSorted(dataSource, "document_task_status"),
      onFilter: (value, record) =>
        record?.document_task_status?.indexOf(value) === 0,
    },
    document_task_problem: {
      title: "Задача",
      dataIndex: "document_task_problem",
      align: "center",
    },
  };

  const dictColumn = {
    ...documentColumns,
    ...documentTaskColumns,
    ...documentArchive,
  };

  /**
   * Выбрать из словаря все запрошенные колонки
   */
  return columns?.data?.map((column) =>
    dictColumn[column] ? dictColumn[column] : {}
  );
}
