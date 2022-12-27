import { AForm } from "../../../../../adapter";
import CheckboxInputFormItem from "../../../../../fragments/inputs/checkboxInputs";
import SelectInputFormItem from "../../../../../fragments/inputs/selectInputs";
import TextInputFormItem from "../../../../../fragments/inputs/textInputs";
import { useGetDepartmentsQuery } from "../../../../../../core/redux/api/AdminSettings/Catalogs/DepartamentApi";

export default function CreateUpdateForm({ form }) {
  const {
    data: departments = {},
    isError,
    isLoading,
  } = useGetDepartmentsQuery();
  return (
    <AForm form={form}>
      <TextInputFormItem
        title="Наименование должности"
        name="newPositionName"
        rules={[
          {
            required: true,
            message: "Введите название должности",
          },
        ]}
      />
      <SelectInputFormItem
        title="Департамент"
        isLoading={isLoading}
        isError={isError}
        name="departmentId"
        options={departments}
        rules={[
          {
            required: true,
            message: "Выберите департамент",
          },
        ]}
      />
      <CheckboxInputFormItem
        title="Имеет право подписания документов?"
        name="isSigner"
      />
    </AForm>
  );
}
