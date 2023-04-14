import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Table } from "antd";
import {
  useTableModalDispatch,
  useTableModalsState,
} from "../TableModalProvider";
import getTitle from "../CommonFunctions";
import "../style.css";
import SimpleSpinner from "../../messages/Spinner";
import SimpleError from "../../messages/Error";
import getColumns from "./getColumns";

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
  buttons = ["create", "update", "delete"],
}) {
  const state = useTableModalsState();
  const dispatch = useTableModalDispatch();

  // Этот блок отвечает за открытие элемента по id
  const query = useLocation().search;
  useEffect(() => {
    const id = new URLSearchParams(query).get("id");
    if (id) {
      // eslint-disable-next-line eqeqeq
      const row = dataSource.find((el) => el.key == id);
      if (row) {
        dispatch({
          type: "selectRow",
          currentRow: row,
        });
        dispatch({ type: "openUpdateModal" });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, dataSource]);
  /**
   * Дефолтная логика для кнопок.
   */
  const buttonActions = {
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

  if (isLoading) return <SimpleSpinner />;
  if (isError) return <SimpleError />;

  return (
    <Table
      scroll={{ x: "1000" }}
      key="keyAdminSettingsTable"
      columns={getColumns({ dataSource, columns })}
      dataSource={dataSource}
      pagination={{ position: ["bottomCenter"] }}
      className="height-100"
      title={() => getTitle(title, buttons, buttonActions)}
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
