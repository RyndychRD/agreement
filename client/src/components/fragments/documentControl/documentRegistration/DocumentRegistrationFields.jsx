import DateInputFormItem from "../../inputs/dateInput";
import TextInputFormItem from "../../inputs/textInputs";

export default function DocumentRegistrationFields(props) {
  const { form, isDisabled } = props;
  return (
    <>
      <DateInputFormItem
        form={form}
        disabled={isDisabled}
        key="registrationDate"
        name="registrationDate"
        title="Дата регистрации"
        rules={[
          {
            required: true,
            message: "Укажите дату регистрации",
          },
        ]}
      />
      <TextInputFormItem
        form={form}
        disabled={isDisabled}
        key="registrationNumber"
        name="registrationNumber"
        title="Номер документа"
        rules={[
          {
            required: true,
            message: "Укажите номер документа",
          },
        ]}
      />
    </>
  );
}
