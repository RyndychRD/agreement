import { InputNumber } from "antd";

export default function RenderNumberInput(props) {
  const { elemNameForForm, defaultValue, form } = props;
  if (defaultValue) {
    form.setFieldValue(elemNameForForm, defaultValue);
  }
  return (
    <InputNumber
      id={elemNameForForm}
      formatter={(value) => value.replace(",", ".")}
      parser={(value) => value.replace(",", ".")}
      stringMode
      style={{ width: "175px" }}
      precision={2}
      value={defaultValue}
      onChange={(e) => {
        form.setFieldValue(elemNameForForm, e);
      }}
    />
  );
}
