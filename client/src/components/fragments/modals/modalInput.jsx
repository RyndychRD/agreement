import { AModal } from "../../adapter";
import SimpleError from "../messages/Error";
import SimpleSpinner from "../messages/Spinner";
import {
  useTableModalsState,
  useTableModalDispatch,
} from "../tables/TableModalProvider";

/**
 * Общее окно для отображения модального окна добавления чего либо.
 * При сабмите вызывает функцию для добавления данных в БД
 * @param {*} object.form Ссылка на форму. Так как форма для каждого модального окна своя, объявляется выше по стеку
 * @param {*} object.addMutation Запрос, который служит для добавления данных в БД при сабмите. Обычно дергается из /core/redux/api
 * @param {*} object.CreateUpdateForm Скелет окна без данных. Представляет форму с элементами
 * @returns
 */
export default function ModalInput({ form, addMutation, CreateUpdateForm }) {
  const state = useTableModalsState();
  const dispatch = useTableModalDispatch();
  const [addFunc, { isError, isLoading, reset }] = addMutation();
  const isOpen = state.isShowCreateModal;

  const children = isOpen ? <CreateUpdateForm form={form} /> : "";
  /**
   * При создании валидируем форму и отправляем все данные в сервис
   */
  const onFinish = () => {
    form
      .validateFields()
      .then(async (values) => {
        await addFunc(values).unwrap();
        form.resetFields();
        if (!isError) {
          dispatch({ type: "closeAllModal" });
        }
      })
      .catch((info) => {
        console.log("Ошибка на форме создания:", info);
      });
  };
  return (
    <AModal
      okText="Сохранить"
      cancelText="Отмена"
      destroyOnClose
      onOk={onFinish}
      onCancel={() => {
        reset();
        form.resetFields();
        dispatch({ type: "closeAllModal" });
      }}
      open={isOpen}
    >
      {isLoading ? <SimpleSpinner /> : ""}
      {isError ? <SimpleError /> : ""}
      {!isLoading && !isError && isOpen ? children : ""}
    </AModal>
  );
}
