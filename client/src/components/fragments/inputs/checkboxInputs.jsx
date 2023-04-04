import { Checkbox, Divider, Form } from "antd";
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
  form,
}) {
  const [checkedValues, setCheckedValues] = useState([]);
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);

  const handleCheckAll = (e) => {
    setIsCheckedAll(e.target.checked);
    setIndeterminate(false);
    setCheckedValues(
      e.target.checked ? options.map((option) => option.value) : []
    );
    form.setFieldValue(
      name,
      e.target.checked ? options.map((option) => option.value) : []
    );
  };

  const handleCheck = (e) => {
    setCheckedValues(e);
    setIsCheckedAll(e.length === options.length);
    setIndeterminate(!!e.length && e.length < options.length);
    form.setFieldValue(name, e);
  };

  if (isError) return <SimpleError />;
  if (isLoading) return <SimpleSpinner />;
  if (!(options && options.length > 0)) return null;

  return (
    <Form.Item
      rules={rules}
      name={name}
      label={title}
      style={{ width: "100%" }}
      valuePropName="checked"
      labelCol={{ span: 24 }}
    >
      <>
        <Checkbox
          indeterminate={indeterminate}
          checked={isCheckedAll}
          onChange={handleCheckAll}
        >
          Выбрать все
        </Checkbox>
        <Divider style={{ marginTop: "10px", marginBottom: "5px" }} />
        <Checkbox.Group
          style={{ width: "100%" }}
          className={className}
          options={options}
          value={checkedValues}
          onChange={handleCheck}
        />
      </>
    </Form.Item>
  );
}
