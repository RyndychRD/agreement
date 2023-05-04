import { Input } from "antd";

export default function RenderTextInput(props) {
  const { elemNameForForm, defaultValue, form } = props;
  if (defaultValue) {
    form.setFieldValue(elemNameForForm, defaultValue);
  }
  return (
    <Input
      id={elemNameForForm}
      type="text"
      value={defaultValue}
      onChange={(e) => {
        form.setFieldValue(elemNameForForm, e.target.value);
      }}
    />
  );
}
