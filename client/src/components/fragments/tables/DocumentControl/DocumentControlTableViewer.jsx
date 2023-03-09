import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Table } from "antd";
import { Excel } from "antd-table-saveas-excel";
import {
  useTableModalDispatch,
  useTableModalsState,
} from "../TableModalProvider";
import getTitle from "../CommonFunctions";
import "../style.css";
import SimpleSpinner from "../../messages/Spinner";
import SimpleError from "../../messages/Error";
import getColumns from "./getColumns";
import { useGetUnreadNotificationsQueryHook } from "../../../../core/redux/api/DocumentControl/NotificationApi";

/**
 * Конструктор таблиц для предварительного просмотра перечиня документов.
 * Для корректной работы предварительно необходимо обернуть в провайдер. Он находится в этой же папке
 * @param {Object} columns - список колонок для отображения
 * @param {string} title - Название таблицы, которое должно отображаться в заголовке
 * @param {Array<Object>} dataSource - Массив объектов для отображения в таблице. Один объект - одна строка
 * */
export default function DocumentControlTableViewer({
  columns = {},
  title = null,
  dataSource = null,
  isLoading = false,
  isError = false,
  buttons = ["create", "update", "delete"],
  notificationType,
  customDispatch,
  customState,
  queryIdNameForOpen = "id",
}) {
  // Для переиспользования компонента мы можем передать кастомный диспатчер и стате. Но по дефолту нам подходит обычный для таблиц
  const standardState = useTableModalsState();
  const standardDispatch = useTableModalDispatch();
  const state = customState ? customState() : standardState;
  const dispatch = customDispatch ? customDispatch() : standardDispatch;

  const columnsNamed = getColumns({ dataSource, columns });

  const { data: notificationIds, isLoading: isLoadingNotifications } =
    useGetUnreadNotificationsQueryHook(
      { isGetNotificationCount: false },
      {
        pollingInterval: 1000,
      }
    );

  let documentForNotifying = [];
  if (!isLoadingNotifications && notificationIds) {
    documentForNotifying = notificationIds
      ?.filter((el) => el.notification_type === notificationType)
      .map((el) => el.element_id);
  }

  // Этот блок отвечает за открытие элемента по id
  const query = useLocation().search;
  useEffect(() => {
    const id = new URLSearchParams(query).get(queryIdNameForOpen);
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

  // TODO: Возможно, стоит заменить на useRef. Пока не понимаю импакта на производительность
  const [currentDataSource, setCurrentDataSource] = useState(dataSource);

  // Функция, которая отвечает за экспорт в Excel
  const handleExport = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(columnsNamed)
      .addDataSource(currentDataSource, {
        str2Percent: true,
      })
      .saveAs("Excel.xlsx");
  };

  /**
   * Дефолтная логика для кнопок. Пока что нет задачи изменять количество кнопок
   */
  const buttonsActions = {
    create: () => {
      dispatch({ type: "openCreateModal" });
    },
    update: () => {
      dispatch({ type: "openUpdateModal" });
    },
    delete: () => {
      dispatch({ type: "openDeleteModal" });
    },
    excel: () => {
      handleExport();
    },
  };

  if (isLoading) return <SimpleSpinner />;
  if (isError) return <SimpleError />;

  return (
    <Table
      scroll={{ x: "1000" }}
      onChange={(pagination, filters, sorter, extra) => {
        setCurrentDataSource(extra.currentDataSource);
      }}
      key="keyDocumentControlTableViewer"
      columns={columnsNamed}
      dataSource={dataSource}
      pagination={{ position: ["bottomCenter"] }}
      className="height-100"
      title={() => getTitle(title, buttons, buttonsActions)}
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
        let selectedClass = "";
        if (row.key === state?.currentRow?.key) {
          selectedClass = `${selectedClass} selected-table-row`;
        }
        if (documentForNotifying.includes(row.key)) {
          selectedClass = `${selectedClass} notify-row`;
        }
        return `ant-table-row ant-table-row-level-0 ${selectedClass}`;
      }}
    />
  );
}
