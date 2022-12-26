import { ASelect, AFormItem } from "../../adapter";
import SimpleSpinner from "../spinners/Spinner";
import SimpleError from "../spinners/Error";

export default function SelectInputFormItem({
  title = "Поле ввода",
  name = "formItemName",
  rules = {},
  options = {},
  isLoading = false,
  isError = false,
}) {
  let formatOptions = [];
  if (!isError && !isLoading && options) {
    formatOptions = options.map((el) => ({ label: el.name, value: el.id }));
  }

  let result = "";
  if (isError) {
    result = <SimpleError />;
  } else if (isLoading) {
    result = <SimpleSpinner />;
  } else {
    result = <ASelect options={formatOptions} placeholder={title} />;
  }

  return (
    <AFormItem label={title} name={name} rules={rules} labelCol={{ span: 24 }}>
      {result}
    </AFormItem>
  );
}
