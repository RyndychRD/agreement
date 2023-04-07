import { Form } from "antd";
import DocumentTasksShowBlock from "../../../../../fragments/documentControl/documentTasks/DocumentTasksShow";
import { LargeTextInputFormItem } from "../../../../../fragments/inputs/textInputs";
import FragmentFileUploader from "../../../../../fragments/file/FragmentFileUploader";
import DocumentTaskSecondListZakupTRU from "../../../../../fragments/documentControl/documentTasks/buttonModals/documentTaskExtraFields/DocumentTaskSecondListZakupTRU";
import DocumentTaskDocumentRegistration from "../../../../../fragments/documentControl/documentTasks/buttonModals/documentTaskExtraFields/DocumentTaskDocumentRegistration";

export default function updateForm({ form, rawData }) {
  let content = "";
  switch (rawData.document_task_type_id) {
    /* Если это Поручение для 2 листа согласования Закупа ТРУ */
    case 2:
      content = <DocumentTaskSecondListZakupTRU form={form} />;
      break;
    case 3:
      content = <DocumentTaskDocumentRegistration form={form} />;
      break;
    default:
      content = (
        <LargeTextInputFormItem
          name="result"
          rules={[
            {
              required: true,
              message: "Выберите получателя",
            },
          ]}
          title="Результат"
        />
      );
      break;
  }
  return (
    <>
      <DocumentTasksShowBlock rawData={rawData} />
      <Form form={form}>
        {content}
        <FragmentFileUploader isRequired={false} />
      </Form>
    </>
  );
}
