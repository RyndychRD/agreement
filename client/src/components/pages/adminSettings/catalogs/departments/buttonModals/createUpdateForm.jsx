import { Form } from "antd";
import { useGetRightsQueryHook } from "../../../../../../core/redux/api/Globals/Catalogs/RightApi";
import SelectInputFormItem from "../../../../../fragments/inputs/selectInputs";
import TextInputFormItem from "../../../../../fragments/inputs/textInputs";

export default function CreateUpdateForm({ form }) {
  const { data: rights = {}, isError, isLoading } = useGetRightsQueryHook();
  return (
    <Form form={form}>
      <TextInputFormItem
        title="Наименование департамента"
        name="newDepartmentName"
        rules={[
          {
            required: true,
            message: "Введите название департамента",
          },
        ]}
      />
      <SelectInputFormItem
        title="Права"
        isLoading={isLoading}
        isError={isError}
        isModeMultiple
        name="rightIds"
        options={rights}
        rules={[]}
      />
    </Form>
  );
}
