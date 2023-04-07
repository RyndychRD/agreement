import { Button, Form } from "antd";

import moment from "moment";
import { usePutDocumentRegistrationAndChangeStatusMutationHook } from "../../../../core/redux/api/DocumentControl/DocumentApi";
import SimpleSpinner from "../../messages/Spinner";
import SimpleError from "../../messages/Error";
import ModalConfirm from "../../modals/ModalConfirm";
import CreateButtonModel from "../documentTasks/buttonModals/create";
import { useDocumentTasksInnerTableDispatch } from "../../tables/DocumentTasksInnerTableProvider";
import DocumentRegistrationFields from "./DocumentRegistrationFields";
import { useGetDocumentTasksByDocumentQueryHook } from "../../../../core/redux/api/DocumentControl/DocumentTaskApi";

/**
 *
 * @param isShowReturnBackOneStepButton - Показать кнопку Вернуть на шаг назад
 * @param isShowRejectButton - Показать кнопку Отклонить
 * @returns
 */
export default function DocumentRegistrationSet(props) {
  const { documentId, closeModalFunc } = props;
  const dispatchDocumentTask = useDocumentTasksInnerTableDispatch();
  const [form] = Form.useForm();
  const { data: documentTasks = {}, isLoading: isLoadingDocumentTasks } =
    useGetDocumentTasksByDocumentQueryHook({
      documentId,
    });

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

  if (isLoadingDocumentTasks) return <SimpleSpinner />;
  const documentTask = documentTasks.find(
    (task) =>
      task.document_task_type_id === 3 && task.document_task_status_id === 2
  );
  if (documentTask) {
    form.setFieldsValue({
      ...documentTask.custom_fields,
      registrationDate: moment(documentTask.custom_fields.registrationDate),
    });
  }

  const onClickCreateTask = () => {
    dispatchDocumentTask({ type: "openCreateModal", modalTypeId: 3 });
  };

  return (
    <>
      <Button
        className="warning-button"
        onClick={onClickCreateTask}
        style={{ marginBottom: "15px" }}
      >
        Создать поручение для заполнения данных о регистрации
      </Button>
      <CreateButtonModel documentId={documentId} />
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
        <DocumentRegistrationFields form={form} />

        <Form.Item wrapperCol={{ push: 7 }}>
          <Button type="primary" htmlType="submit">
            Документ подписан в ООПЗ
          </Button>
        </Form.Item>
        {isLoading ? <SimpleSpinner /> : ""}
        {isError ? <SimpleError /> : ""}
      </Form>
    </>
  );
}
