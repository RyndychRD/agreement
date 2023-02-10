import { Button, Form } from "antd";
import DateInputFormItem from "../../inputs/dateInput";
import TextInputFormItem from "../../inputs/textInputs";
import { usePutDocumentMitvorgAndChangeStatusMutationHook } from "../../../../core/redux/api/DocumentControl/DocumentApi";
import SimpleSpinner from "../../messages/Spinner";
import SimpleError from "../../messages/Error";

/**
 *
 * @param isShowReturnBackOneStepButton - Показать кнопку Вернуть на шаг назад
 * @param isShowRejectButton - Показать кнопку Отклонить
 * @returns
 */
export default function DocumentMitvorgRegistrationSet(props) {
  const { documentId, closeModalFunc } = props;

  const [form] = Form.useForm();

  const [updateFunc, { isLoading, isError }] =
    usePutDocumentMitvorgAndChangeStatusMutationHook();
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
    <Form form={form} name="mitvorgInputForm" onFinish={onFinish}>
      <DateInputFormItem
        form={form}
        key="mitvorgRegistrationDate"
        name="mitvorgRegistrationDate"
        title="Дата регистрации на Митворге"
        rules={[
          {
            required: true,
            message: "Укажите дату регистрации на Митворге",
          },
        ]}
      />
      <TextInputFormItem
        form={form}
        key="mitvorgNumber"
        name="mitvorgNumber"
        title="Митворг номер"
        rules={[
          {
            required: true,
            message: "Укажите Митворг номер",
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
