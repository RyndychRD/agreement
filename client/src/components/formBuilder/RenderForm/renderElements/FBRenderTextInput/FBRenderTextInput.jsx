import { Input } from "antd";
import FBElementLayout from "../FBElementLayout";

export default function RenderTextInput(props) {
  const { CurrentElement, elemNameForForm } = props;

  return (
    <FBElementLayout name={CurrentElement.name}>
      <Input id={elemNameForForm} type="text" />
    </FBElementLayout>
  );
}
