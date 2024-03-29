import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Table } from "antd";
import { Excel } from "antd-table-saveas-excel";
import { useSelector } from "react-redux";
import {
  useTableModalDispatch,
  useTableModalsState,
} from "../TableModalProvider";
import getTitle from "../CommonFunctions";
import "../style.css";
import SimpleSpinner from "../../messages/Spinner";
import SimpleError from "../../messages/Error";
import getColumns from "./getColumns";
import { useUpdateDocumentMutation } from "../../../../core/redux/api/DocumentControl/DocumentApi";
import ModalConfirm from "../../modals/ModalConfirm";

const REJECT_STATUS_ID = 2;

/**
 * Конструктор таблиц для предварительного просмотра перечиня документов.
 * Для корректной работы предварительно необходимо обернуть в провайдер. Он находится в этой же папке
 * @param {Object} columns - список колонок для отображения
 * @param {string} title - Название таблицы, которое должно отображаться в заголовке
 * @param {Array<Object>} dataSource - Массив объектов для отображения в таблице. Один объект - одна строка
 * @param {*} buttons
 * @param {*} notificationType
 * @param {*} customDispatch
 * @param {*} customState
 * @param {*} queryIdNameForOpen Не работает. Оставлен для того, чтобы потом открывать записи не только по id, но и по другим первичным ключам
 * */
export default function DocumentControlTableViewer(props) {
  const {
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
  } = props;
  // Для переиспользования компонента мы можем передать кастомный диспатчер и стате. Но по дефолту нам подходит обычный для таблиц
  const standardState = useTableModalsState();
  const standardDispatch = useTableModalDispatch();
  const state = customState ? customState() : standardState;
  const dispatch = customDispatch ? customDispatch() : standardDispatch;

  const columnsNamed = getColumns({ dataSource, columns });

  // Подсветка нотификации. Выбираем только те, которые по типу относятся к текущей таблице
  const notifications = useSelector(
    (stateNotifications) =>
      stateNotifications.notification.notifications.length > 0
        ? stateNotifications.notification.notifications.filter(
            (notification) =>
              notification.notification_type === notificationType
          )
        : [],
    (oldValue, newValue) => oldValue === newValue
  );
  let documentForNotifying = [];
  if (notifications) {
    documentForNotifying = notifications
      .filter((el) => el.notification_type === notificationType)
      .map((el) => el.element_id);
  }

  const [updateFunc] = useUpdateDocumentMutation();

  // TODO: Возможно, стоит заменить на useRef. Пока не понимаю импакта на производительность
  const [currentDataSourceForExcel, setCurrentDataSourceForExcel] = useState();

  // Этот блок отвечает за открытие элемента по id
  const query = useLocation().search;
  useEffect(() => {
    setCurrentDataSourceForExcel(dataSource);
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

  // Функция, которая отвечает за экспорт в Excel
  const handleExport = () => {
    const excel = new Excel();
    excel
      .addSheet("Выгрузка")
      .addColumns(columnsNamed)
      .addDataSource(currentDataSourceForExcel, {
        str2Percent: true,
      })
      .saveAs("Выгрузка.xlsx");
  };

  /**
   * Логика для кнопок
   */
  // TODO: Вынести в отдельную функцию
  const buttonsActions = {
    create: () => {
      dispatch({ type: "openCreateModal" });
    },
    createSpecialTask: () => {
      dispatch({
        type: "openCreateModal",
        modalTypeId: 2,
      });
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
    restore: () => {
      ModalConfirm({
        content: "Вы точно хотите восстановить документ?",
        onOk: () => {
          updateFunc({
            document_id: state?.currentRow.document_id,
            newDocumentStatusId:
              state?.currentRow.document_status_before_soft_delete,
          });
        },
        okText: "Да, я хочу восстановить документ",
        cancelText: "Нет",
      });
    },
    reject: () => {
      if (
        state?.currentRow.document_status_id === 5 ||
        state?.currentRow.document_status_id === 7
      ) {
        ModalConfirm({
          content:
            "Вы точно хотите отклонить документ? Вы не сможете вернуть документ на маршрут согласования после отклонения, придется создавать документ заново",
          onOk: () => {
            updateFunc({
              document_id: state?.currentRow.document_id,
              newDocumentStatusId: REJECT_STATUS_ID,
              newRemark: "Отклонен создателем документа",
            });
          },
          okText: "Да, я хочу отклонить документ",
          cancelText: "Нет",
        });
      } else {
        ModalConfirm({
          title: "Ошибка",
          content:
            "Только документы в статусе 'В работе' и 'На доработке' можно отклонить",
          okText: "Хорошо",
          cancelText: "Закрыть",
        });
      }
    },
  };

  if (isLoading) return <SimpleSpinner />;
  if (isError) return <SimpleError />;
  return (
    <Table
      scroll={{ x: "1000" }}
      onChange={(pagination, filters, sorter, extra) => {
        if (buttons.find((button) => button === "excel")) {
          setCurrentDataSourceForExcel(extra.currentDataSource);
        }
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
