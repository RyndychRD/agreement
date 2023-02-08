import { Checkbox, Form } from "antd";
import { useState } from "react";
import SimpleError from "../messages/Error";
import SimpleSpinner from "../messages/Spinner";

export default function CheckboxInputFormItem({
  title = "Поле ввода",
  name = "formItemName",
  checked = false,
}) {
  const [isChecked, setIsChecked] = useState(checked);

  const toggleChecked = () => {
    setIsChecked(!isChecked);
  };
  return (
    <Form.Item name={name} valuePropName="checked" labelCol={{ span: 24 }}>
      <Checkbox checked={isChecked} onChange={toggleChecked}>
        {title}
      </Checkbox>
    </Form.Item>
  );
}

export function CheckboxGroupInputFormItem({
  title = "Поле ввода",
  name = "formItemName",
  className = {},
  options = [],
  rules = [],
  isLoading = false,
  isError = false,
}) {
  if (isError) return <SimpleError />;
  if (isLoading) return <SimpleSpinner />;
  if (!(options && options.length > 0)) return null;
  return (
    <Form.Item
      rules={rules}
      label={title}
      name={name}
      style={{ width: "100%" }}
      valuePropName="checked"
      labelCol={{ span: 24 }}
    >
      <Checkbox.Group
        style={{ width: "100%" }}
        className={className}
        options={options}
      />
    </Form.Item>
  );
}
