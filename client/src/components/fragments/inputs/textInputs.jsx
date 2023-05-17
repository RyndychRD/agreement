import { Form, Input, InputNumber } from "antd";

/**
 * Стандартная форма для ввода текста
 * @param {*} props.title
 * @param {*} props.name
 * @param {*} props.rules
 * @param {*} props.value
 * @param {*} props.disabled
 * @returns
 */
export default function TextInputFormItem(props) {
  const {
    title = "Поле ввода",
    name = "formItemName",
    rules = {},
    value = "",
    disabled = false,
  } = props;
  return (
    <Form.Item label={title} name={name} rules={rules} labelCol={{ span: 24 }}>
      <Input placeholder={title} value={value} disabled={disabled} />
    </Form.Item>
  );
}

/**
 * Стандартная форма для ввода числа
 * @param {*} props.title
 * @param {*} props.name
 * @param {*} props.rules
 * @param {*} props.formatter функция, которая форматирует ввод пользователя
 * @param {*} props.parser функция, которая преобразует ввод пользователя до сохранения
 * @param {*} props.value
 * @param {*} props.addonAfter используется для добавления значка процентов в НДС
 * @param {*} props.max
 * @param {*} props.min
 * @param {*} props.onBlur Действие при потере фокуса
 * @param {*} props.disabled
 * @returns
 */
export function NumberInputFormItem(props) {
  const {
    title = "Поле ввода",
    name = "formItemName",
    rules = {},
    formatter = (defaultValue) => defaultValue,
    parser = (defaultParser) => defaultParser,
    value = "",
    addonAfter = "",
    max = {},
    min = {},
    onBlur = () => {},
    disabled = false,
  } = props;
  return (
    <Form.Item label={title} name={name} rules={rules} labelCol={{ span: 24 }}>
      <InputNumber
        onBlur={onBlur}
        max={max}
        min={min}
        addonAfter={addonAfter}
        style={{ width: "175px" }}
        formatter={formatter}
        parser={parser}
        placeholder={title}
        value={value}
        stringMode
        disabled={disabled}
      />
    </Form.Item>
  );
}

export function LargeTextInputFormItem({
  title = "Поле ввода",
  name = "formItemName",
  rules = {},
  value = "",
  disabled = false,
}) {
  return (
    <Form.Item label={title} name={name} rules={rules} labelCol={{ span: 24 }}>
      <Input.TextArea placeholder={title} value={value} disabled={disabled} />
    </Form.Item>
  );
}
