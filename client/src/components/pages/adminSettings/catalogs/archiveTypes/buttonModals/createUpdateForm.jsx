import { AForm } from "../../../../../adapter";
import TextInputFormItem from "../../../../../fragments/inputs/textInputs";

export default function CreateUpdateForm({ form }) {
  return (
    <AForm form={form}>
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
    </AForm>
  );
}
