import { AForm } from "../../../../../adapter";
import TextInputFormItem from "../../../../../fragments/inputs/textInputs";

export default function CreateUpdateForm({ form }) {
  return (
    <AForm form={form}>
      <TextInputFormItem
        title="Наименование права"
        name="newRightName"
        rules={[
          {
            required: true,
            message: "Введите название права",
          },
        ]}
      />
    </AForm>
  );
}
