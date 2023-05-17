import { Alert, Button, Form } from "antd";

import moment from "moment";
import {
  useGetDocumentsQueryHook,
  usePutDocumentRegistrationAndChangeStatusMutationHook,
} from "../../../../core/redux/api/DocumentControl/DocumentApi";
import SimpleSpinner from "../../messages/Spinner";
import SimpleError from "../../messages/Error";
import ModalConfirm from "../../modals/ModalConfirm";
import CreateButtonModel from "../documentTasks/buttonModals/create";
import { useDocumentTasksInnerTableDispatch } from "../../tables/DocumentTasksInnerTableProvider";
import DocumentRegistrationFields from "./DocumentRegistrationFields";
import { useGetDocumentTasksByDocumentQueryHook } from "../../../../core/redux/api/DocumentControl/DocumentTaskApi";
import { useTableModalsState } from "../../tables/TableModalProvider";

/**
 * Форма для заполнения данных по регистрации. Дает создать поручения для заполнения этих данных или заполнить их самостоятельно
 * @param {*} props.documentId id документа для перевода в новый статус
 * @param {*} props.closeModalFunc функция закрытия родительского окна документа
 * @returns
 */
export default function DocumentRegistrationSet(props) {
  const { documentId, closeModalFunc } = props;
  const dispatchDocumentTask = useDocumentTasksInnerTableDispatch();
  const mainTableState = useTableModalsState();
  const [form] = Form.useForm();
  const { data: documentTasks = {}, isLoading: isLoadingDocumentTasks } =
    useGetDocumentTasksByDocumentQueryHook({
      documentId,
    });

  const { refetch } = useGetDocumentsQueryHook({
    isAddForeignTables: true,
    isShowAllDocs: true,
    status: "8",
    addDocumentTasksByType: 3,
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
      registrationNumber: documentTask.custom_fields.registrationNumber,
      registrationDate: moment(documentTask.custom_fields.registrationDate),
    });
  }

  const onClickCreateTask = () => {
    dispatchDocumentTask({ type: "openCreateModal", modalTypeId: 3 });
  };

  const afterTaskCreationFunc = () => {
    refetch();
    closeModalFunc();
  };

  const confirmOnOkContent = mainTableState.currentRow
    .document_tasks_type_3_is_any
    ? "Вы точно хотите создать новое поручение? Старые данные по регистрации поручения будут удалены"
    : undefined;

  return (
    <>
      <Alert
        style={{ width: "fit-content", marginBottom: "10px" }}
        type="warning"
        message={`Текущий статус поручения: ${mainTableState.currentRow.document_tasks_type_3_status}`}
      />
      <Button
        type="primary"
        onClick={onClickCreateTask}
        style={{ marginBottom: "15px" }}
      >
        Создать поручение для заполнения данных о регистрации
      </Button>
      <CreateButtonModel
        documentId={documentId}
        afterFinishFunc={afterTaskCreationFunc}
        confirmOnOkContent={confirmOnOkContent}
      />
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
