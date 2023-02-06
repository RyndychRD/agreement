import { Form } from "antd";
import DocumentTasksShowBlock from "../../../../../fragments/documentControl/documentTasks/DocumentTasksShow";
import { LargeTextInputFormItem } from "../../../../../fragments/inputs/textInputs";
import FragmentFileUploader from "../../../../../fragments/file/FragmentFileUploader";

export default function updateForm({ form, rawData }) {
  return (
    <>
      <DocumentTasksShowBlock task={rawData} />
      <Form form={form}>
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

        <FragmentFileUploader isRequired={false} />
      </Form>
    </>
  );
}
