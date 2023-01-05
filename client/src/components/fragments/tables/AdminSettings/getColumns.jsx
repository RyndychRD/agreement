import {
  filterDataBoolean,
  filterDataStringSorted,
  booleanRender,
  sorterBoolean,
  sorterInt,
  sorterStringAlphabet,
  renderRights,
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
  };

  /**
   * Выбрать из словаря все запрошенные колонки
   */
  return columns?.data?.map((column) =>
    dictColumn[column] ? dictColumn[column] : null
  );
}
