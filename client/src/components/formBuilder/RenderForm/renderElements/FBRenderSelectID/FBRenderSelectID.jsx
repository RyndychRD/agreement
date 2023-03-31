import { Select } from "antd";
import FBElementLayout from "../FBElementLayout";

export default function RenderSelectID(props) {
  const { elemNameForForm, form, CurrentElement } = props;

  const CurrentElementSelect = CurrentElement?.select_value?.select_id;
  const setValueInSelectOnForm = (value) => {
    form.setFieldValue(elemNameForForm, value);
  };
  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === "v") {
      e.preventDefault();
    }
  };
  return (
    <FBElementLayout name={CurrentElement.name}>
      <Select
        showSearch
        optionFilterProp="children"
        onKeyDown={handleKeyDown}
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
