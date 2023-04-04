import { Form } from "antd";
import TextInputFormItem from "../../../../../fragments/inputs/textInputs";
import CheckboxInputFormItem from "../../../../../fragments/inputs/checkboxInputs";

export default function CreateUpdateForm({ form }) {
  return (
    <Form form={form}>
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

      <CheckboxInputFormItem
        title="Маршрут доступен для конструирования пользователем?"
        name="isRouteConstructAvailable"
      />

      <CheckboxInputFormItem
        title="Форма доступна для конструирования пользователем?"
        name="isFormConstructAvailable"
      />
      <CheckboxInputFormItem
        title="Отображать тип для создания документов?"
        name="isShowForDocumentCreation"
      />
      <CheckboxInputFormItem
        title="Загрузка файлов при создании обязательна для этого типа?"
        name="isFileUploadRequired"
      />
    </Form>
  );
}
