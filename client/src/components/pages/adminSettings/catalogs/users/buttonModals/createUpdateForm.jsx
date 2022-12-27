import { AForm } from "../../../../../adapter";
import SelectInputFormItem from "../../../../../fragments/inputs/selectInputs";
import TextInputFormItem from "../../../../../fragments/inputs/textInputs";
import { useGetPositionsQuery } from "../../../../../../core/redux/api/AdminSettings/Catalogs/PositionsApi";
import CheckboxInputFormItem from "../../../../../fragments/inputs/checkboxInputs";

export default function CreateUpdateForm({ form, isAddDisabledField }) {
  const { data: positions = {}, isLoading, isError } = useGetPositionsQuery();

  const checkbox = isAddDisabledField ? (
    <CheckboxInputFormItem title="Заблокирован?" name="isDisabled" />
  ) : (
    ""
  );

  return (
    <AForm form={form}>
      <TextInputFormItem
        title="Логин пользователя"
        name="newLogin"
        rules={[
          {
            required: true,
            message: "Введите логин пользователя",
          },
        ]}
      />
      <TextInputFormItem
        title="Пароль пользователя(он будет необратимо зашифрован)"
        name="newPassword"
        rules={[
          {
            required: true,
            message: "Введите пароль пользователя",
          },
        ]}
      />
      <TextInputFormItem
        title="Email пользователя"
        name="newEmail"
        rules={[]}
      />
      <TextInputFormItem
        title="Фамилия пользователя"
        name="newFirstName"
        rules={[
          {
            required: true,
            message: "Введите фамилию пользователя",
          },
        ]}
      />
      <TextInputFormItem
        title="Имя пользователя"
        name="newLastName"
        rules={[
          {
            required: true,
            message: "Введите имя пользователя",
          },
        ]}
      />
      <TextInputFormItem
        title="Отчество пользователя"
        name="newMiddleName"
        rules={[]}
      />

      <SelectInputFormItem
        title="Должность"
        isLoading={isLoading}
        isError={isError}
        name="positionId"
        options={positions}
        rules={[
          {
            required: true,
            message: "Выберите должность",
          },
        ]}
      />
      {checkbox}
    </AForm>
  );
}
