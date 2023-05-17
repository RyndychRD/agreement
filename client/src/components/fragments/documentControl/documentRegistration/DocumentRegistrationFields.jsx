import DateInputFormItem from "../../inputs/dateInput";
import TextInputFormItem from "../../inputs/textInputs";

/**
 * Поля, которые используются при регистрации документа
 * @param {*} props.form форма для передачи изначальных значений и запоминания новых
 * @param {*} props.isDisabled можно ли редактировать значения
 * @returns
 */
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
