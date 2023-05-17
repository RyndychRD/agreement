import { DatePicker, Form } from "antd";
import locale from "antd/es/date-picker/locale/ru_RU";

const { RangePicker } = DatePicker;
/**
 * Стандартная форма для выбора даты
 * @param {*} props.title названия для отображения пользователю
 * @param {*} props.name имя для form
 * @param {*} props.rules
 * @param {*} props.disabled
 * @param {*} props.form
 * @returns
 */
export default function DateInputFormItem(props) {
  const {
    title = "Поле ввода",
    name = "formItemName",
    rules = {},
    disabled = false,
    form,
  } = props;
  const setValueInDatePickerOnForm = (value) => {
    form.setFieldValue(name, value);
  };
  return (
    <Form.Item
      labelCol={{ span: 24 }}
      label={title}
      labelAlign="left"
      name={name}
      rules={rules}
    >
      <DatePicker
        style={{ width: "250px" }}
        disabled={disabled}
        type="text"
        locale={locale}
        onChange={setValueInDatePickerOnForm}
        format={(value) => `Выбранная дата: ${value.format("DD.MM.YY")}`}
      />
    </Form.Item>
  );
}

/**
 * Стандартная форма для выбора промежутка даты
 * @param {*} props.title названия для отображения пользователю
 * @param {*} props.name имя для form
 * @param {*} props.rules
 * @param {*} props.disabled
 * @param {*} props.labelCol Сколько места занимает элемент в гриде
 * @param {*} props.form
 * @returns
 */
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
