import {
  HeaderTextOutput,
  SimpleTextOutput,
  TextOutputWithLabel,
} from "../../outputs/textOutputs";
import { userNameMask } from "../../../../services/CommonFunctions";
import { renderDate } from "../../tables/CommonFunctions";
import UploadList from "../../file/fileOutputs";

export default function DocumentTasksShowBlock(props) {
  const { task } = props;
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
      <HeaderTextOutput text="Задача" />
      <SimpleTextOutput text={task?.problem} />
      {task?.result ? (
        <>
          <HeaderTextOutput text="Результат" />

          <SimpleTextOutput text={task?.result} />

          {task?.files.length > 0 ? (
            <>
              <HeaderTextOutput text="Файлы, загруженные в результате выполнения поручения" />
              <UploadList
                fileList={task.files}
                isTempFile={false}
                key="uploadedDocumentTasksFilesList"
              />
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
