import { Input } from "antd";
import FBElementLayout from "../FBElementLayout";

export default function RenderTextInput(props) {
  const { elemNameForForm, title } = props;

  return (
    <FBElementLayout name={title}>
      <Input id={elemNameForForm} type="text" />
    </FBElementLayout>
  );
}
