import { Button, Form } from "antd";
import DateInputFormItem from "../../inputs/dateInput";
import TextInputFormItem from "../../inputs/textInputs";
import { usePutDocumentRegistrationAndChangeStatusMutationHook } from "../../../../core/redux/api/DocumentControl/DocumentApi";
import SimpleSpinner from "../../messages/Spinner";
import SimpleError from "../../messages/Error";
import ModalConfirm from "../../modals/ModalConfirm";

/**
 *
 * @param isShowReturnBackOneStepButton - Показать кнопку Вернуть на шаг назад
 * @param isShowRejectButton - Показать кнопку Отклонить
 * @returns
 */
export default function DocumentRegistrationSet(props) {
  const { documentId, closeModalFunc } = props;

  const [form] = Form.useForm();

  const [updateFunc, { isLoading, isError }] =
    usePutDocumentRegistrationAndChangeStatusMutationHook();
  const onFinish = () => {
    form
      .validateFields()
      .then(async (values) => {
        await updateFunc({
          ...values,
          documentId,
          newDocumentStatusId: 9,
        }).unwrap();
        if (!isError) {
          closeModalFunc();
        }
      })
      .catch((info) => {
        console.log("Ошибка на форме обновления:", info);
      });
  };

  return (
    <Form
      form={form}
      name="registrationInputForm"
      onFinish={() => {
        ModalConfirm({
          onOk: onFinish,
          content: "Вы точно хотите подписать документ?",
          okText: "Да, я хочу подписать документ",
        });
      }}
    >
      <DateInputFormItem
        form={form}
        key="registrationDate"
        name="registrationDate"
        title="Дата регистрации"
        rules={[
          {
            required: true,
            message: "Укажите дату регистрации",
          },
        ]}
      />
      <TextInputFormItem
        form={form}
        key="registrationNumber"
        name="registrationNumber"
        title="Номер документа"
        rules={[
          {
            required: true,
            message: "Укажите номер документа",
          },
        ]}
      />
      <Form.Item wrapperCol={{ push: 7 }}>
        <Button type="primary" htmlType="submit">
          Документ подписан в ООПЗ
        </Button>
      </Form.Item>
      {isLoading ? <SimpleSpinner /> : ""}
      {isError ? <SimpleError /> : ""}
    </Form>
  );
}
