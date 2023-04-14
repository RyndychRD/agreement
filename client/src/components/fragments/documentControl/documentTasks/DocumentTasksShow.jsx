import { Form } from "antd";
import {
  HeaderTextOutput,
  SimpleTextOutput,
  TextOutputWithLabel,
} from "../../outputs/textOutputs";
import { userNameMask } from "../../../../services/CommonFunctions";
import { renderDate } from "../../tables/CommonFunctions";
import UploadList, { UploadListItem } from "../../file/fileOutputs";
import DocumentInformationShow from "../documentInformation/DocumentInformationShow";
import { useGetDocumentFilesQueryHook } from "../../../../core/redux/api/DocumentControl/DocumentApi";
import DocumentTaskSecondListZakupTRU from "./buttonModals/documentTaskExtraFields/DocumentTaskSecondListZakupTRU";
import DocumentTaskDocumentRegistration from "./buttonModals/documentTaskExtraFields/DocumentTaskDocumentRegistration";

export default function DocumentTasksShowBlock(props) {
  const {
    rawData: task,
    form: passedForm,
    isAddPushToDocumentButton = true,
    isDisabled = false,
  } = props;
  const { data: documentFiles = [] } = useGetDocumentFilesQueryHook({
    documentId: task.document_id,
  });

  let [form] = Form.useForm();
  if (passedForm) {
    form = passedForm;
  }

  let resultContent = "";
  switch (task?.document_task_type_id) {
    case 2:
      resultContent = (
        <Form form={form}>
          <DocumentTaskSecondListZakupTRU isDisabled={isDisabled} form={form} />
        </Form>
      );
      break;
    case 3:
      resultContent = (
        <Form form={form}>
          <DocumentTaskDocumentRegistration
            isDisabled={isDisabled}
            form={form}
          />
        </Form>
      );
      break;
    default:
      resultContent = <SimpleTextOutput text={task?.result} />;
      break;
  }

  return (
    <>
      <HeaderTextOutput text="Информация по поручению" />
      <TextOutputWithLabel
        label="Поручитель"
        text={userNameMask(task?.creator)}
      />
      <TextOutputWithLabel
        label="Исполнитель"
        text={userNameMask(task?.executor)}
      />
      <TextOutputWithLabel
        label="Статус поручения"
        text={task?.document_task_status_name}
      />
      <TextOutputWithLabel
        label="Дата и время создания"
        text={renderDate(task.created_at)}
      />
      <TextOutputWithLabel
        label="Установленный срок"
        text={renderDate(task.due_at, false)}
      />
      {task?.documentValues && task.documentValues.length > 0 ? (
        <>
          <HeaderTextOutput text="Переданные данные из договора" />
          <DocumentInformationShow data={task?.documentValues} />
        </>
      ) : (
        ""
      )}
      {task?.documentFiles && task.documentFiles.length > 0 ? (
        <>
          <HeaderTextOutput text="Переданные файлы из договора" />
          <UploadList
            fileList={task.documentFiles}
            isTempFile={false}
            key="passedDocumentFilesFilesList"
          />
        </>
      ) : (
        ""
      )}
      <HeaderTextOutput text="Задача" />
      <SimpleTextOutput text={task?.problem} />

      {task?.document_task_status_id === 2 ? (
        <>
          <HeaderTextOutput text="Результат" />
          {resultContent}
        </>
      ) : (
        ""
      )}
      {task?.files.length > 0 ? (
        <>
          <HeaderTextOutput text="Файлы, загруженные в результате выполнения поручения" />
          <UploadList>
            {task.files.map((file) => (
              <UploadListItem
                key={file.id}
                file={file}
                isTempFile={false}
                isAddPushToDocumentButton={
                  !documentFiles.find((el) => el.file_id === file.id) &&
                  isAddPushToDocumentButton
                }
                documentId={task.document_id}
              />
            ))}
          </UploadList>
        </>
      ) : (
        ""
      )}
      {task?.document_task_status_id === 2 ? (
        <TextOutputWithLabel
          label="Дата и время завершения задачи"
          text={renderDate(task.finished_at)}
        />
      ) : (
        ""
      )}
    </>
  );
}
