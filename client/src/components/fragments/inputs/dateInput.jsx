import { DatePicker, Form } from "antd";
import locale from "antd/es/date-picker/locale/ru_RU";

const { RangePicker } = DatePicker;
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
        type="text"
        locale={locale}
        onChange={setValueInDatePickerOnForm}
        format={(value) => `Выбранная дата: ${value.format("DD.MM.YY")}`}
      />
    </Form.Item>
  );
}
export function DateRangeInputFormItem({
  title = "Поле ввода",
  name = "formItemName",
  rules = {},
  form,
  labelCol = { span: 24 },
  disabled,
}) {
  const setValueInDatePickerOnForm = (value) => {
    if (value === null) {
      form.setFieldValue(name, { start: null, end: null });
    } else {
      form.setFieldValue(name, {
        start: value[0]?.format("YYYY-MM-DD"),
        end: value[1]?.format("YYYY-MM-DD"),
      });
    }
  };
  return (
    <Form.Item
      label={title}
      labelAlign="left"
      labelCol={labelCol}
      name={name}
      rules={disabled ? [] : rules}
      valuePropName="checked"
    >
      <RangePicker
        type="text"
        locale={locale}
        disabled={disabled}
        onChange={setValueInDatePickerOnForm}
        format={(value) => `Выбранная дата: ${value.format("DD.MM.YY")}`}
      />
    </Form.Item>
  );
}
