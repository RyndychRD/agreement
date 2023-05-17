/** @format */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import {
  clearUrlQueryParams,
  replaceUrlQueryWithId,
} from "../../../services/CommonFunctions";
import SimpleError from "../messages/Error";
import SimpleSpinner from "../messages/Spinner";
import NotificationService from "../../../services/DocumentControlServices/NotificationService";
import {
  useTableModalDispatch,
  useTableModalsState,
} from "../tables/TableModalProvider";
import { onCancelConfirm } from "../tables/CommonFunctions";
import ModalConfirm from "./ModalConfirm";

/**
 * Общее окно для отображения модального окна изменения чего либо.
 * По переданной выбранной строке из таблицы запрашивает в БД данные по объекту, отображает форму с заполненными данными
 * При сабмите вызывает функцию для изменения данных в БД
 * @param {*} props.getQuery Запрос, который служит для вытаскивания данных из БД при открытии. Обычно дергается из /core/redux/api
 * @param {*} props.updateMutation Запрос, который служит для обновления данных в БД при сабмите. Обычно дергается из /core/redux/api
 * @param {*} props.form Ссылка на форму. Так как форма для каждого модального окна своя, объявляется выше по стеку
 * @param {*} props.CreateUpdateForm Скелет окна без данных. Представляет форму с элементами
 * @param {*} props.formDefaultValues Функция заполнения формы form значениями после выполнения запроса
 * @param {*} props.preFinishFunc Кастомная функция предобработки значения формы при сабмите
 * @param {*} props.afterFinishFunc Кастомная функция, которая выполняется после сабмита
 * @param {*} props.isAddForeignTables Отдельно выделенный флаг из additionalGetQueryProps. Поленился совмещать при рефакторинге
 * @param {*} props.additionalGetQueryProps Дополнительные флаги для скелета CreateUpdateForm
 * @param {*} props.notificationType Какой тип нотификации закрыть при открытии этого документа
 * @param {*} props.isAddConfirmOnCancel Добавить ли подтверждение при попытке закрыть документ
 * @param {*} props.isAddConfirmOnOk Добавить ли подтверждение при попытке сохранить данные
 * @param {*} props.customState Кастомная функция предобработки значения формы при сабмите
 * @param {*} props.customDispatch Кастомная функция предобработки значения формы при сабмите
 * @param {*} props.footer Кастомная функция предобработки значения формы при сабмите
 * @param {*} props.confirmOnOkContent Кастомная функция предобработки значения формы при сабмите
 * @returns
 */
export default function ModalUpdate(props) {
  const {
    getQuery,
    updateMutation,
    form,
    CreateUpdateForm,
    formDefaultValues = () => {},
    preFinishFunc = null,
    afterFinishFunc = () => {},
    isAddForeignTables = false,
    additionalGetQueryProps = {},
    notificationType,
    isAddConfirmOnCancel = true,
    isAddConfirmOnOk = true,
    customState,
    footer = undefined,
    customDispatch,
    okButtonText = "Сохранить",
    confirmOnOkContent = "Вы точно хотите продолжить?",
  } = props;
  const standardState = useTableModalsState();
  const standardDispatch = useTableModalDispatch();
  const state = customState ? customState() : standardState;
  const dispatch = customDispatch ? customDispatch() : standardDispatch;
  const navigate = useNavigate();
  const isOpen = state.isShowUpdateModal && state.currentRow !== undefined;

  const [
    updateFunc,
    { isLoading: isLoadingUpdate, isError: isErrorUpdate, reset: resetUpdate },
  ] = updateMutation();

  const {
    data = {},
    isLoading: isLoadingGet,
    isError: isErrorGet,
  } = getQuery({
    currentRow: state?.currentRow,
    isStart: state.isShowUpdateModal && state?.currentRow,
    isAddRights: true,
    isAddForeignTables,
    ...additionalGetQueryProps,
  });

  /**
   * При редактировании валидируем форму и отправляем все данные в апи
   */
  const onFinish = () => {
    form
      .validateFields()
      .then(async (values) => {
        const preparedValues = preFinishFunc ? preFinishFunc(values) : values;
        await updateFunc({
          ...preparedValues,
          currentRow: state.currentRow,
        }).unwrap();
        if (!isErrorUpdate) {
          // Переходим к очищенному юрл, чтобы если мы перешли по id, у нас после сабмита не открывалась старая форма
          // (сабмит перезагружает страницу с изначальным url)
          navigate(clearUrlQueryParams());
          dispatch({ type: "closeAllModal" });
          afterFinishFunc();
        }
      })
      .catch((info) => {
        console.log("Ошибка на форме обновления:", info);
      });
  };

  const isLoading = isLoadingGet || isLoadingUpdate;
  const isError = isErrorGet || isErrorUpdate;

  /**
   * Очищаем форму, достаем нужную строку из хранилища редакса по переданному ID
   * Заполняем форму полученными данными
   * Запускается только после того как форма отображается
   */
  useEffect(
    () => {
      if (isOpen) {
        // Читаем все нотификации по этому документу если передан идентификатор по которому читать
        NotificationService.readNotifications({
          elementId: state.currentRow.key,
          notificationType,
        });
      }
      if (!isError && !isLoading && isOpen) {
        form.resetFields();
        form.setFieldsValue(formDefaultValues(data));
        replaceUrlQueryWithId(state.currentRow?.key);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, isOpen]
  );

  const onCancel = () => {
    resetUpdate();
    clearUrlQueryParams();
    dispatch({ type: "closeAllModal" });
  };

  return (
    <Modal
      okText={okButtonText}
      cancelText="Отмена"
      footer={footer}
      onOk={
        isAddConfirmOnOk
          ? () => {
              ModalConfirm({
                content: confirmOnOkContent,
                onOk: () => {
                  onFinish();
                },
                okText: "Да",
                cancelText: "Нет",
              });
            }
          : onFinish
      }
      open={isOpen}
      onCancel={
        isAddConfirmOnCancel
          ? () => {
              onCancelConfirm(onCancel);
            }
          : onCancel
      }
    >
      {isLoading ? <SimpleSpinner /> : ""}
      {isError ? <SimpleError /> : ""}
      {!isLoading && !isError && isOpen ? (
        <CreateUpdateForm form={form} rawData={data} isAddUpdateOnlyFields />
      ) : (
        ""
      )}
    </Modal>
  );
}
