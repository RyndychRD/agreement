import { ASelect, AFormItem } from "../../adapter";

export default function SelectInputFormItem({
  title = "Поле ввода",
  name = "formItemName",
  rules = {},
  options = {},
}) {
  let formatOptions = [];
  if (options) {
    formatOptions = options.map((el) => ({ label: el.name, value: el.id }));
  }
  return (
    <AFormItem label={title} name={name} rules={rules} labelCol={{ span: 24 }}>
      <ASelect options={formatOptions} placeholder={title} />
    </AFormItem>
  );
}
