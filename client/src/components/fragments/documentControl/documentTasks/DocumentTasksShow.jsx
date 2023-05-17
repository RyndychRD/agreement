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

/**
 * Фрагмент для отображения одного поручения
 * @param {*} props.rawData данные для отображения в поручении
 * @param {*} props.form
 * @param {*} props.isAddPushToDocumentButton добавить ли возможность запушить в родительский документ файл из поручения?
 * @param {*} props.isDisabled можно ли изменять поручение
 * @returns
 */
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
    // Поручения для Михеевой. Тип 2
    case 2:
      resultContent = (
        <Form form={form}>
          <DocumentTaskSecondListZakupTRU isDisabled={isDisabled} form={form} />
        </Form>
      );
      break;
    // Поручение для регистрации документов. Тип 3
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
    // Обычное поручение
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
      {/* Если при создании поручения создать решил передать данные из изначального договора, то отображать этот блок */}
      {task?.documentValues && task.documentValues.length > 0 ? (
        <>
          <HeaderTextOutput text="Переданные данные из договора" />
          <DocumentInformationShow data={task?.documentValues} />
        </>
      ) : (
        ""
      )}
      {/* Если при создании поручения создать решил передать файлы из изначального договора, то отображать этот блок */}
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

      {/* Отображение результата выполенния поручения согласно его типа */}
      {task?.document_task_status_id === 2 ? (
        <>
          <HeaderTextOutput text="Результат" />
          {resultContent}
        </>
      ) : (
        ""
      )}
      {/* Если в результате выполнения поручений были загружены файлы, то отображает этот блок и, возможно, даем возможность добавить файлы из поручения в договор */}
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
