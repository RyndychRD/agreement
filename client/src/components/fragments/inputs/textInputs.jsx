import { Form, Input } from "antd";

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
