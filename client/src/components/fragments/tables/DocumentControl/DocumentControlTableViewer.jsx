import {
  useTableModalDispatch,
  useTableModalsState,
} from "../TableModalProvider";
import { ATable } from "../../../adapter";
import getTitle from "../CommonFunctions";
import "../style.css";
import SimpleSpinner from "../../messages/Spinner";
import SimpleError from "../../messages/Error";
import getColumns from "./getColumns";
import { useGetUnreadNotificationsByTypeQueryHook } from "../../../../core/redux/api/DocumentControl/NotificationApi";

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
}) {
  const state = useTableModalsState();
  const dispatch = useTableModalDispatch();
  const { data: documentIds, isLoading: isLoadingNotifications } =
    useGetUnreadNotificationsByTypeQueryHook(
      { notificationType, isGetNotificationCount: false },
      {
        pollingInterval: 500,
      }
    );
  let documentForNotifying;
  if (!isLoadingNotifications) {
    documentForNotifying = documentIds.map((el) => el.document_id);
  }

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
  };

  if (isLoading) return <SimpleSpinner />;
  if (isError) return <SimpleError />;

  return (
    <ATable
      key="keyDocumentControlTableViewer"
      columns={getColumns({ dataSource, columns })}
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
