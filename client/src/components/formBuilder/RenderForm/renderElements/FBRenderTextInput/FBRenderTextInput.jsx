import { Input } from "antd";

export default function RenderTextInput(props) {
  const { elemNameForForm, form } = props;

  return (
    <Input
      id={elemNameForForm}
      type="text"
      onChange={(e) => {
        form.setFieldValue(elemNameForForm, e.target.value);
      }}
    />
  );
}
