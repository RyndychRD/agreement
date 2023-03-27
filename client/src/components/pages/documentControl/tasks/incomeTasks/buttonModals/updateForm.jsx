import { Form } from "antd";
import DocumentTasksShowBlock from "../../../../../fragments/documentControl/documentTasks/DocumentTasksShow";
import { LargeTextInputFormItem } from "../../../../../fragments/inputs/textInputs";
import FragmentFileUploader from "../../../../../fragments/file/FragmentFileUploader";
import DocumentTaskSecondListZakupTRU from "../../../../../fragments/documentControl/documentTasks/buttonModals/documentTaskExtraFields/DocumentTaskSecondListZakupTRU";

export default function updateForm({ form, rawData }) {
  return (
    <>
      <DocumentTasksShowBlock rawData={rawData} />
      <Form form={form}>
        {/* Если это Поручение для 2 листа согласования Закупа ТРУ */}
        {rawData.document_task_type_id === 2 ? (
          <DocumentTaskSecondListZakupTRU form={form} />
        ) : (
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
        )}
        <FragmentFileUploader isRequired={false} />
      </Form>
    </>
  );
}
