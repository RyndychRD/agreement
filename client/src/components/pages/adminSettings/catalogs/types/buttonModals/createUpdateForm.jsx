import { AForm } from "../../../../../adapter";
import TextInputFormItem from "../../../../../fragments/inputs/textInputs";

export default function CreateUpdateForm({ form }) {
  return (
    <AForm form={form}>
      <TextInputFormItem
        title="Наименование типа документа"
        name="newTypeName"
        rules={[
          {
            required: true,
            message: "Введите название типа документа",
          },
        ]}
      />
    </AForm>
  );
}
