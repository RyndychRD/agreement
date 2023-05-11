import { Form, Input, InputNumber } from "antd";

export default function TextInputFormItem({
  title = "Поле ввода",
  name = "formItemName",
  rules = {},
  value = "",
  disabled = false,
}) {
  return (
    <Form.Item label={title} name={name} rules={rules} labelCol={{ span: 24 }}>
      <Input placeholder={title} value={value} disabled={disabled} />
    </Form.Item>
  );
}
export function NumberInputFormItem({
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
}) {
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
