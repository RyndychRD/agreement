import { Select } from "antd";
import FBElementLayout from "../FBElementLayout";

export default function RenderSelectID(props) {
  const { elemNameForForm, form, CurrentElement, title } = props;

  const CurrentElementSelect = CurrentElement?.select_value?.select_id;
  const setValueInSelectOnForm = (value) => {
    form.setFieldValue(elemNameForForm, value);
  };
  const handlePaste = (e) => {
    e.preventDefault();
  };
  return (
    <FBElementLayout name={title}>
      <Select
        showSearch
        optionFilterProp="children"
        onPaste={handlePaste}
        onDrop={handlePaste}
        onChange={setValueInSelectOnForm}
        filterOption={(input, option) =>
          (option?.label.toLowerCase() ?? "").includes(input.toLowerCase())
        }
        id={elemNameForForm}
        options={CurrentElementSelect}
      />
    </FBElementLayout>
  );
}
