import _ from "lodash";
import {
  booleanRender,
  filterData,
  sorterBoolean,
  sorterInt,
  sorterStringAlphabet,
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
  const dictColumn = {
    department_id: {
      title: "ID",
      dataIndex: "department_id",
      align: "center",
      sorter: (a, b) => sorterInt(a.department_id, b.department_id),
    },

    department_name: {
      title: "Наименование департамента",
      dataIndex: "department_name",
      align: "center",
      sorter: (a, b) =>
        sorterStringAlphabet(a.department_name, b.department_name),
      filters: _.uniqWith(
        filterData(dataSource)((i) => i.department_name),
        _.isEqual
      ),
      onFilter: (value, record) => record.department_name.indexOf(value) === 0,
    },

    position_id: {
      title: "ID",
      dataIndex: "position_id",
      align: "center",
      sorter: (a, b) => sorterInt(a.department_id, b.department_id),
    },

    position_name: {
      title: "Наименование должности",
      dataIndex: "position_name",
      align: "center",
      sorter: (a, b) =>
        sorterStringAlphabet(a.department_name, b.department_name),
      filters: _.uniqWith(
        filterData(dataSource)((i) => i.position_name),
        _.isEqual
      ),
      onFilter: (value, record) => record.position_name.indexOf(value) === 0,
    },

    position_is_signer: {
      title: "Может подписать документы",
      dataIndex: "position_is_signer",
      align: "center",
      sorter: (a, b) =>
        sorterBoolean(a.position_is_signer, b.position_is_signer),
      render: (value) => booleanRender(value),

      filters: _.uniqWith(
        filterData(dataSource)((i) => (i.position_is_signer ? "Да" : "Нет")),
        _.isEqual
      ),
      onFilter: (value, record) =>
        value === "Да" ? record.position_is_signer : !record.position_is_signer,
    },

    user_id: {
      title: "ID",
      dataIndex: "user_id",
      align: "center",
      sorter: (a, b) => sorterInt(a.department_id, b.department_id),
    },

    user_login: {
      title: "Логин пользователя",
      dataIndex: "user_login",
      align: "center",
      sorter: (a, b) => sorterStringAlphabet(a.login, b.login),
      filters: _.uniqWith(
        filterData(dataSource)((i) => i.login),
        _.isEqual
      ),
      onFilter: (value, record) => record.login.indexOf(value) === 0,
    },
    user_email: {
      title: "Email пользователя",
      dataIndex: "user_email",
      align: "center",
      sorter: (a, b) => sorterStringAlphabet(a.email, b.email),
      filters: _.uniqWith(
        filterData(dataSource)((i) => i.email),
        _.isEqual
      ),
      onFilter: (value, record) => record.email.indexOf(value) === 0,
    },
    user_fio: {
      title: "ФИО пользователя",
      dataIndex: "user_fio",
      align: "center",
      sorter: (a, b) => sorterStringAlphabet(a.fio, b.fio),
      filters: _.uniqWith(
        filterData(dataSource)((i) => i.fio),
        _.isEqual
      ),
      onFilter: (value, record) => record.fio.indexOf(value) === 0,
    },
    user_is_active: {
      title: "Есть доступ в систему?",
      dataIndex: "user_is_active",
      align: "center",
      sorter: (a, b) => sorterBoolean(a.user_is_active, b.user_is_active),
      render: (value) => booleanRender(value),

      filters: _.uniqWith(
        filterData(dataSource)((i) => (i.user_is_active ? "Да" : "Нет")),
        _.isEqual
      ),
      onFilter: (value, record) =>
        value === "Да" ? record.user_is_active : !record.user_is_active,
    },
  };

  /**
   * Выбрать из словаря все запрошенные колонки
   */
  return columns?.data.map((column) =>
    dictColumn[column] ? dictColumn[column] : null
  );
}
