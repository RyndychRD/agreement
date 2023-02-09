import { Form } from "antd";
import { useGetUsersQueryHook } from "../../../../../core/redux/api/Globals/Catalogs/UserApi";
import { getUserNameAndPositionOptionsForSelect } from "../../../../../services/CommonFunctions";
import SelectInputFormItem from "../../../inputs/selectInputs";
import DateInputFormItem from "../../../inputs/dateInput";
import { LargeTextInputFormItem } from "../../../inputs/textInputs";
import { useGetDocumentValuesQueryHook } from "../../../../../core/redux/api/DocumentControl/DocumentApi";
import { CheckboxGroupInputFormItem } from "../../../inputs/checkboxInputs";

export default function CreateForm({ form, documentId }) {
  const {
    data: users = [],
    isError: isErrorUsers,
    isLoading: isLoadingUsers,
  } = useGetUsersQueryHook({ isAddForeignTables: true });
  const {
    data: documentValues = {},
    isLoading: isLoadingValues,
    isError: isErrorValues,
  } = useGetDocumentValuesQueryHook({ documentId, isAddForeignTables: true });
  console.log(documentValues);
  return (
    <Form form={form}>
      <Form.Item hidden name="documentId" />
      <SelectInputFormItem
        title="Получатель"
        isLoading={isLoadingUsers}
        isError={isErrorUsers}
        name="executorId"
        options={getUserNameAndPositionOptionsForSelect(users, false, false)}
        rules={[
          {
            required: true,
            message: "Выберите получателя",
          },
        ]}
      />
      <DateInputFormItem
        name="dueAt"
        title="Срок исполнения до"
        rules={[
          {
            required: true,
            message: "Выберите получателя",
          },
        ]}
        form={form}
      />
      <LargeTextInputFormItem
        key="problem"
        name="problem"
        rules={[
          {
            required: true,
            message: "Выберите получателя",
          },
        ]}
        title="Задача"
      />
      <CheckboxGroupInputFormItem
        isError={isErrorValues}
        isLoading={isLoadingValues}
        key="documentPassedValues"
        name="documentPassedValues"
        options={[]}
        title="Данные из документа"
      />
    </Form>
  );
}
