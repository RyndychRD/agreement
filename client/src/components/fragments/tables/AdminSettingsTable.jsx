import _ from "lodash";
import { useCustomDispatch, useCustomState } from "./Provider";
import { ATable } from "../../adapter";
import getTitle, {
  booleanRender,
  filterData,
  sorterBoolean,
  sorterInt,
  sorterStringAlphabet,
} from "./CommonFunctions";
import "./style.css";
import SimpleSpinner from "../spinners/Spinner";
import SimpleError from "../spinners/Error";
/**
 * Конструктор таблиц для админки.
 * Для корректной работы предварительно необходимо обернуть в провайдер. Он находится в этой же папке
 * @param {Object} columns - список колонок для отображения
 * @param {string} title - Название таблицы, которое должно отображаться в заголовке
 * @param {Array<Object>} dataSource - Массив объектов для отображения в таблице. Один объект - одна строка
 * */
export default function AdminSettingsTable({
  columns = {},
  title = null,
  dataSource = null,
  isLoading = false,
  isError = false,
}) {
  const state = useCustomState();
  const dispatch = useCustomDispatch();
  /**
   * Дефолтная логика для кнопок. Пока что нет задачи изменять количество кнопок
   */
  const buttons = {
    create: () => {
      dispatch({ type: "openCreateModal" });
    },
    update: () => {
      dispatch({ type: "openUpdateModal" });
    },
    delete: () => {
      dispatch({ type: "openDeleteModal" });
    },
  };

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
  };

  /**
   * Выбрать из словаря все запрошенные колонки
   */
  const tableColumns = columns?.data.map((column) =>
    dictColumn[column] ? dictColumn[column] : null
  );

  if (isLoading) return <SimpleSpinner />;
  if (isError) return <SimpleError />;

  return (
    <ATable
      key="keyAdminSettingsTable"
      columns={tableColumns}
      dataSource={dataSource}
      pagination={{ position: ["bottomCenter"] }}
      className="height-100"
      title={() => getTitle(title, buttons)}
      onRow={(row) => ({
        // Выбираем текущую строку
        onClick: () => {
          dispatch({ type: "closeAllModal" });
          dispatch({
            type: "selectRow",
            currentRow: row,
          });
        },
        // Двойной клик всегда срабатывает после одинарного
        onDoubleClick: () => {
          dispatch({ type: "openUpdateModal" });
        },
      })}
      rowClassName={(row) => {
        if (row.key === state?.currentRow?.key) {
          return "ant-table-row ant-table-row-level-0 selected-table-row";
        }
        return "ant-table-row ant-table-row-level-0";
      }}
    />
  );
}
