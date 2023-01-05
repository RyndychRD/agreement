import { Form, Input } from "antd";

export default function InputElementForm({ restField, name }) {
  return (
    <Form.Item
      {...restField}
      name={[name, "AreaName"]}
      rules={[
        {
          required: true,
          message: "Данные не внесены",
        },
      ]}
    >
      <Input placeholder="Наименование поля" />
    </Form.Item>
  );
}
