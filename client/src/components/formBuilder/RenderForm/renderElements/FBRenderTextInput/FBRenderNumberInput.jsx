import { InputNumber } from "antd";

export default function RenderNumberInput(props) {
  const { elemNameForForm, form } = props;

  return (
    <InputNumber
      id={elemNameForForm}
      formatter={(value) => value.replace(",", ".")}
      parser={(value) => value.replace(",", ".")}
      stringMode
      style={{ width: "175px" }}
      precision={2}
      onChange={(e) => {
        form.setFieldValue(elemNameForForm, e);
      }}
    />
  );
}
