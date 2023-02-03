/** @format */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  clearUrlQueryParams,
  replaceUrlQueryWithId,
} from "../../../services/CommonFunctions";
import { AModal } from "../../adapter";
import SimpleError from "../messages/Error";
import SimpleSpinner from "../messages/Spinner";
import {
  useTableModalDispatch,
  useTableModalsState,
} from "../tables/TableModalProvider";

/**
 * Общее окно для отображения модального окна изменения чего либо.
 * По переданной выбранной строке из таблицы запрашивает в БД данные по объекту, отображает форму с заполненными данными
 * При сабмите вызывает функцию для изменения данных в БД
 * @param {*} object.getQuery Запрос, который служит для вытаскивания данных из БД при открытии. Обычно дергается из /core/redux/api
 * @param {*} object.updateMutation Запрос, который служит для обновления данных в БД при сабмите. Обычно дергается из /core/redux/api
 * @param {*} object.form Ссылка на форму. Так как форма для каждого модального окна своя, объявляется выше по стеку
 * @param {*} object.CreateUpdateForm Скелет окна без данных. Представляет форму с элементами
 * @param {*} object.formDefaultValues Функция заполнения формы form значениями после выполнения запроса
 * @param {*} object.preFinishFunc Кастомная функция предобработки значения формы при сабмите
 * @returns
 */
export default function ModalUpdate({
  getQuery,
  updateMutation,
  form,
  CreateUpdateForm,
  formDefaultValues,
  preFinishFunc = null,
  isAddForeignTables = false,
}) {
  const state = useTableModalsState();
  const dispatch = useTableModalDispatch();
  const navigate = useNavigate();
  const isOpen = state.isShowUpdateModal && state.currentRow;

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
        }
      })
      .catch((info) => {
        console.log("Ошибка на форме обновления:", info);
      });
  };

  /**
   * Очищаем форму, достаем нужную строку из хранилища редакса по переданному ID
   * Заполняем форму полученными данными
   * Запускается только после того как форма отображается
   */
  useEffect(
    () => {
      if (!isErrorUpdate && state.isShowUpdateModal) {
        form.resetFields();
        form.setFieldsValue(formDefaultValues(data));
        replaceUrlQueryWithId(state.currentRow?.key);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.isShowUpdateModal, data]
  );

  const isLoading = isLoadingGet || isLoadingUpdate;
  const isError = isErrorGet || isErrorUpdate;

  return (
    <AModal
      okText="Редактировать"
      cancelText="Отмена"
      onOk={onFinish}
      open={isOpen}
      onCancel={() => {
        resetUpdate();
        clearUrlQueryParams();
        dispatch({ type: "closeAllModal" });
      }}
    >
      {isLoading ? <SimpleSpinner /> : ""}
      {isError ? <SimpleError /> : ""}
      {!isLoading && !isError && isOpen ? (
        <CreateUpdateForm form={form} rawData={data} isAddUpdateOnlyFields />
      ) : (
        ""
      )}
    </AModal>
  );
}
