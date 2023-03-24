import { Form, Input, InputNumber } from "antd";

export default function TextInputFormItem({
  title = "Поле ввода",
  name = "formItemName",
  rules = {},
  value = "",
}) {
  return (
    <Form.Item label={title} name={name} rules={rules} labelCol={{ span: 24 }}>
      <Input placeholder={title} value={value} />
    </Form.Item>
  );
}
export function IntegerInputFormItem({
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
        defaultValue={value}
        stringMode
      />
    </Form.Item>
  );
}

export function LargeTextInputFormItem({
  title = "Поле ввода",
  name = "formItemName",
  rules = {},
  value = "",
}) {
  return (
    <Form.Item label={title} name={name} rules={rules} labelCol={{ span: 24 }}>
      <Input.TextArea placeholder={title} value={value} />
    </Form.Item>
  );
}
