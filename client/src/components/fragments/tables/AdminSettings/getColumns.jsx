import {
  filterDataBoolean,
  filterDataStringSorted,
  booleanRender,
  sorterBoolean,
  sorterInt,
  sorterStringAlphabet,
  renderRights,
  sorterDate,
  renderDate,
} from "../CommonFunctions";

/**
 * Возвращает список колонок для таблицы. В себе хранит словарь, так как для фильтров нужно указать значения, а эти значения - это все строчки в таблице
 * @param {*} dataSource - Все значения из таблицы для фильтра
 * @param {*} columns - Список запрошенных колонок
 * @returns
 */
export default function getColumns({ dataSource, columns }) {
  /**
   * Словарь всех возможных колонок для таблицы
   */

  const departmentColumns = {
    department_id: {
      title: "ID",
      dataIndex: "department_id",
      defaultSortOrder: "ascend",
      align: "center",
      sorter: (a, b) => sorterInt(a?.department_id, b?.department_id),
    },
    department_name: {
      title: "Наименование департамента",
      dataIndex: "department_name",
      align: "center",
      sorter: (a, b) =>
        sorterStringAlphabet(a?.department_name, b?.department_name),
      filters: filterDataStringSorted(dataSource, "department_name"),
      onFilter: (value, record) =>
        record?.department_name?.indexOf(value) === 0,
    },
  };

  const positionColumns = {
    position_id: {
      title: "ID",
      dataIndex: "position_id",
      defaultSortOrder: "ascend",
      align: "center",
      sorter: (a, b) => sorterInt(a?.position_id, b?.position_id),
    },
    position_name: {
      title: "Наименование должности",
      dataIndex: "position_name",
      align: "center",
      sorter: (a, b) =>
        sorterStringAlphabet(a?.position_name, b?.position_name),
      filters: filterDataStringSorted(dataSource, "position_name"),
      onFilter: (value, record) => record?.position_name?.indexOf(value) === 0,
    },
    position_is_signer: {
      title: "Может подписать документы",
      dataIndex: "position_is_signer",
      align: "center",
      sorter: (a, b) =>
        sorterBoolean(a?.position_is_signer, b?.position_is_signer),
      render: (value) => booleanRender(value),

      filters: filterDataBoolean(dataSource, "position_is_signer"),
      onFilter: (value, record) =>
        value === "Да"
          ? record?.position_is_signer
          : !record?.position_is_signer,
    },
  };

  const constructorColumns = {
    route_id: {
      title: "ID",
      dataIndex: "route_id",
      defaultSortOrder: "ascend",
      align: "center",
      sorter: (a, b) => sorterInt(a?.route_id, b?.route_id),
    },
    type_view_id: {
      title: "ID",
      dataIndex: "type_view_id",
      defaultSortOrder: "ascend",
      align: "center",
      sorter: (a, b) => sorterInt(a?.type_view_id, b?.type_view_id),
    },
    user_fio_route_constructor: {
      title: "ФИО предлагаемого подписанта",
      dataIndex: "user_fio_route_constructor",
      align: "center",
    },
    position_route_constructor: {
      title: "Должность подписанта",
      dataIndex: "position_route_constructor",
      align: "center",
    },
  };

  const logColumns = {
    log_id: {
      title: "ID",
      dataIndex: "log_id",
      defaultSortOrder: "descend",
      align: "center",
      sorter: (a, b) => sorterInt(a?.log_id, b?.log_id),
    },
    log_user_fio: {
      title: "ФИО пользователя",
      dataIndex: "log_user_fio",
      align: "center",
      sorter: (a, b) => sorterStringAlphabet(a?.log_user_fio, b?.log_user_fio),
      filters: filterDataStringSorted(dataSource, "log_user_fio"),
      onFilter: (value, record) => record?.log_user_fio?.indexOf(value) === 0,
    },
    archive_action_type: {
      title: "Тип действия в архиве",
      dataIndex: "archive_action_type",
      align: "center",
      sorter: (a, b) =>
        sorterStringAlphabet(a?.archive_action_type, b?.archive_action_type),
      filters: filterDataStringSorted(dataSource, "archive_action_type"),
      onFilter: (value, record) =>
        record?.archive_action_type?.indexOf(value) === 0,
    },
    log_created_at: {
      title: "Дата действия",
      dataIndex: "log_created_at",
      align: "center",
      sorter: (a, b) => sorterDate(a, b),
      render: (value) => renderDate(value),
    },
  };
  const userColumns = {
    user_id: {
      title: "ID",
      dataIndex: "user_id",
      defaultSortOrder: "ascend",
      align: "center",
      sorter: (a, b) => sorterInt(a?.user_id, b?.user_id),
    },

    user_login: {
      title: "Логин пользователя",
      dataIndex: "user_login",
      align: "center",
      sorter: (a, b) => sorterStringAlphabet(a?.user_login, b?.user_login),
      filters: filterDataStringSorted(dataSource, "user_login"),
      onFilter: (value, record) => record?.user_login?.indexOf(value) === 0,
    },
    user_email: {
      title: "Email пользователя",
      dataIndex: "user_email",
      align: "center",
      sorter: (a, b) => sorterStringAlphabet(a?.user_email, b?.user_email),
      filters: filterDataStringSorted(dataSource, "user_email"),
      onFilter: (value, record) => record?.user_email?.indexOf(value) === 0,
    },
    user_fio: {
      title: "ФИО пользователя",
      dataIndex: "user_fio",
      align: "center",
      sorter: (a, b) => sorterStringAlphabet(a?.user_fio, b?.user_fio),
      filters: filterDataStringSorted(dataSource, "user_fio"),
      onFilter: (value, record) => record?.user_fio?.indexOf(value) === 0,
    },
    user_is_disabled: {
      title: "Есть доступ в систему?",
      dataIndex: "user_is_disabled",
      align: "center",
      sorter: (a, b) => sorterBoolean(a?.user_is_disabled, b?.user_is_disabled),
      render: (value) => booleanRender(!value),

      filters: filterDataBoolean(dataSource, "user_is_disabled"),
      onFilter: (value, record) =>
        value === "Да" ? !record?.user_is_disabled : record?.user_is_disabled,
    },
  };

  const typeColumns = {
    type_id: {
      title: "ID",
      dataIndex: "type_id",
      defaultSortOrder: "ascend",
      align: "center",
      sorter: (a, b) => sorterInt(a?.type_id, b?.type_id),
    },
    type_name: {
      title: "Наименование типа документа",
      dataIndex: "type_name",
      align: "center",
      sorter: (a, b) => sorterStringAlphabet(a?.type_name, b?.type_name),
      filters: filterDataStringSorted(dataSource, "type_name"),
      onFilter: (value, record) => record?.type_name?.indexOf(value) === 0,
    },
  };
  const archiveTypeColumns = {
    archive_type_id: {
      title: "ID",
      dataIndex: "archive_type_id",
      defaultSortOrder: "ascend",
      align: "center",
      sorter: (a, b) => sorterInt(a?.archive_type_id, b?.archive_type_id),
    },
    archive_type_name: {
      title: "Наименование типа архива",
      dataIndex: "archive_type_name",
      align: "center",
      sorter: (a, b) =>
        sorterStringAlphabet(a?.archive_type_name, b?.archive_type_name),
      filters: filterDataStringSorted(dataSource, "archive_type_name"),
      onFilter: (value, record) =>
        record?.archive_type_name?.indexOf(value) === 0,
    },
  };

  const rightColumns = {
    right_id: {
      title: "ID",
      dataIndex: "right_id",
      defaultSortOrder: "ascend",
      align: "center",
      sorter: (a, b) => sorterInt(a?.right_id, b?.right_id),
    },

    right_name: {
      title: "Наименование права",
      dataIndex: "right_name",
      align: "center",
      sorter: (a, b) => sorterStringAlphabet(a?.right_name, b?.right_name),
      filters: filterDataStringSorted(dataSource, "right_name"),
      onFilter: (value, record) => record?.right_name?.indexOf(value) === 0,
    },
    right_code_name: {
      title: "Наименование права в коде",
      dataIndex: "right_code_name",
      align: "center",
      sorter: (a, b) =>
        sorterStringAlphabet(a?.right_code_name, b?.right_code_name),
      filters: filterDataStringSorted(dataSource, "right_code_name"),
      onFilter: (value, record) =>
        record?.right_code_name?.indexOf(value) === 0,
    },

    rights_list: {
      title: "Список прав",
      dataIndex: "rights_list",
      align: "center",
      render: (items) => renderRights(items),
    },
  };

  const dictColumn = {
    ...departmentColumns,
    ...positionColumns,
    ...userColumns,
    ...rightColumns,
    ...archiveTypeColumns,
    ...typeColumns,
    ...constructorColumns,
    ...logColumns,
  };

  /**
   * Выбрать из словаря все запрошенные колонки
   */
  return columns?.data?.map((column) =>
    dictColumn[column] ? dictColumn[column] : {}
  );
}
