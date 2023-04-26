import { Form, Modal } from "antd";
import { useUpdateDocumentMutation } from "../../../../../../core/redux/api/DocumentControl/DocumentApi";
// import { useTableModalDispatch } from "../../../../tables/TableModalProvider";
import SimpleSpinner from "../../../../messages/Spinner";
import SimpleError from "../../../../messages/Error";
import TextInputFormItem from "../../../../inputs/textInputs";
import {
  useRouteStepFragmentState,
  useRouteStepFragmentDispatch,
} from "../../RouteStepFragmentProvider";
import { useTableModalDispatch } from "../../../../tables/TableModalProvider";

function getMessage(type) {
  switch (type) {
    case "reject":
      return `Вы действительно хотите отклонить документ? Весь прогресс будет остановлен и процесс согласования будет необходимо начать заново.`;
    default:
      return `Сообщение для типа ${type} не найдено`;
  }
}

export default function RejectDocumentModal({ documentId }) {
  const state = useRouteStepFragmentState();
  const dispatchConfirm = useRouteStepFragmentDispatch();
  const dispatchTable = useTableModalDispatch();

  const [
    updateFunc,
    { isLoading: isLoadingUpdate, isError: isErrorUpdate, reset: resetUpdate },
  ] = useUpdateDocumentMutation();
  // const dispatchTable = useTableModalDispatch();
  const [form] = Form.useForm();
  const onFinish = () => {
    form
      .validateFields()
      .then(async (values) => {
        const valuesToSend = {
          document_id: documentId,
          newDocumentStatusId: state.documentStatusId,
          newRemark: values.remark,
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
      open={state.isOpenChangeStatusModal}
    >
      <div>
        <span>{getMessage(state.modalType)}</span>
      </div>

      <Form form={form}>
        <TextInputFormItem
          title="Причина отклонения"
          name="remark"
          rules={[
            {
              required: true,
              message: "Введите причину отклонения",
            },
          ]}
        />
      </Form>
      {isLoadingUpdate ? <SimpleSpinner /> : ""}
      {isErrorUpdate ? <SimpleError /> : ""}
    </Modal>
  );
}
