import { useState } from "react";
import { ACheckbox, AFormItem } from "../../adapter";

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
    <AFormItem name={name} valuePropName="checked" labelCol={{ span: 24 }}>
      <ACheckbox checked={isChecked} onChange={toggleChecked}>
        {title}
      </ACheckbox>
    </AFormItem>
  );
}
