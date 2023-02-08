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

export default function DocumentTasksShowBlock(props) {
  const { task } = props;

  const { data: documentFiles = [] } = useGetDocumentFilesQueryHook({
    documentId: task.document_id,
  });

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

      {task?.result ? (
        <>
          <HeaderTextOutput text="Результат" />

          <SimpleTextOutput text={task?.result} />

          {task?.files.length > 0 ? (
            <>
              <HeaderTextOutput text="Файлы, загруженные в результате выполнения поручения" />
              {task.files.map((file) => (
                <UploadListItem
                  key={file.id}
                  file={file}
                  isTempFile={false}
                  isAddPushToDocumentButton={
                    !documentFiles.find((el) => el.file_id === file.id)
                  }
                  documentId={task.document_id}
                />
              ))}
            </>
          ) : (
            ""
          )}
          <TextOutputWithLabel
            label="Дата и время завершения задачи"
            text={renderDate(task.finished_at)}
          />
        </>
      ) : (
        ""
      )}
    </>
  );
}
