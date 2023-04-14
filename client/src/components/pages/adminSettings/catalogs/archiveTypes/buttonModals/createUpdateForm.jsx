import { Form } from "antd";
import TextInputFormItem from "../../../../../fragments/inputs/textInputs";

export default function CreateUpdateForm({ form }) {
  return (
    <Form form={form}>
      <TextInputFormItem
        title="Наименование типа архива"
        name="newArchiveTypeName"
        rules={[
          {
            required: true,
            message: "Введите типа архива",
          },
        ]}
      />
    </Form>
  );
}
