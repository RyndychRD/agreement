import { DatePicker, Form } from "antd";
import locale from "antd/es/date-picker/locale/ru_RU";

export default function DateInputFormItem({
  title = "Поле ввода",
  name = "formItemName",
  rules = {},
  form,
}) {
  const setValueInDatePickerOnForm = (value) => {
    form.setFieldValue(name, value.format("YYYY-MM-DD"));
  };
  return (
    <Form.Item
      labelCol={{ span: 12 }}
      wrapperCol={{ span: 12 }}
      label={title}
      labelAlign="left"
      name={name}
      rules={rules}
      valuePropName="checked"
    >
      <DatePicker
        weekStart={0}
        type="text"
        locale={locale}
        onChange={setValueInDatePickerOnForm}
        format={(value) => `Выбранная дата: ${value.format("DD.MM.YY")}`}
      />
    </Form.Item>
  );
}
