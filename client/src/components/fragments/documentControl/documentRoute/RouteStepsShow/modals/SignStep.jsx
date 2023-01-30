import { Form, Modal } from "antd";
import TextInputFormItem from "../../../../inputs/textInputs";
import SimpleSpinner from "../../../../messages/Spinner";
import SimpleError from "../../../../messages/Error";
import {
  useRouteStepFragmentDispatch,
  useRouteStepFragmentState,
} from "../../RouteStepFragmentProvider";
import { useSignCurrentDocumentStepMutationHook } from "../../../../../../core/redux/api/DocumentControl/DocumentApi";
import { useTableModalDispatch } from "../../../../tables/TableModalProvider";

function getMessage(type) {
  switch (type) {
    case "confirm":
      return "Вы уверены что хотите согласовать договор?";
    case "confirmWithRemark":
      return "Вы уверены что хотите согласовать договор с замечанием?";
    case "rejectWithRemark":
      return "Вы уверены что хотите НЕ согласовать договор?";
    case "returnStepBack":
      return "Вы уверены что хотите вернуть подписание договора на шаг назад?";
    default:
      return `Сообщение для типа ${type} не найдено`;
  }
}

function getRemarkIfNeeded(type, form) {
  switch (type) {
    case "confirmWithRemark":
    case "rejectWithRemark":
      return (
        <Form form={form}>
          <TextInputFormItem
            title="Замечание"
            name="remark"
            rules={[
              {
                required: true,
                message: "Введите замечание",
              },
            ]}
          />
        </Form>
      );
    case "returnStepBack":
    case "confirm":
      return "";
    default:
      return `Форма ввода для типа ${type} не найдено`;
  }
}

export default function SignStep({ currentStepId, previousSignStepId }) {
  const state = useRouteStepFragmentState();
  const dispatchConfirm = useRouteStepFragmentDispatch();
  const dispatchTable = useTableModalDispatch();
  const [form] = Form.useForm();
  const [
    updateFunc,
    { isLoading: isLoadingUpdate, isError: isErrorUpdate, reset: resetUpdate },
  ] = useSignCurrentDocumentStepMutationHook();

  const onFinish = () => {
    form
      .validateFields()
      .then(async (values) => {
        const valuesToSend = {
          ...values,
          signatureTypeId: state.signatureTypeId,
          currentStepId,
          previousSignStepId,
        };

        await updateFunc(valuesToSend).unwrap();
        form.resetFields();
        if (!isErrorUpdate) {
          dispatchConfirm({ type: "closeModal" });
          dispatchTable({ type: "closeAllModal" });
        }
      })
      .catch((info) => {
        console.log("Ошибка на форме создания:", info);
      });
  };

  return (
    <Modal
      onCancel={() => {
        resetUpdate();
        dispatchConfirm({ type: "closeModal" });
      }}
      onOk={onFinish}
      okText="Сохранить"
      cancelText="Отмена"
      open={state.isOpenSigningModal}
    >
      <div>
        <span>{getMessage(state.modalType)}</span>
      </div>

      {getRemarkIfNeeded(state.modalType, form)}
      {isLoadingUpdate ? <SimpleSpinner /> : ""}
      {isErrorUpdate ? <SimpleError /> : ""}
    </Modal>
  );
}
