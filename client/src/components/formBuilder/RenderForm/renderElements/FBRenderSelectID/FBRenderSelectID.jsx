import { AutoComplete } from "antd";

export default function RenderSelectID(props) {
  const { elemNameForForm, form, defaultValue, CurrentElement } = props;

  const CurrentElementSelect = CurrentElement?.select_value?.select_id;
  const setValueInSelectOnForm = (value) => {
    form.setFieldValue(elemNameForForm, value);
  };

  if (defaultValue) {
    form.setFieldValue(elemNameForForm, defaultValue);
  }
  return (
    <AutoComplete
      optionFilterProp="children"
      onSelect={setValueInSelectOnForm}
      onChange={setValueInSelectOnForm}
      defaultValue={defaultValue}
      filterOption={(input, option) =>
        (option?.label.toLowerCase() ?? "").includes(input.toLowerCase())
      }
      id={elemNameForForm}
      options={CurrentElementSelect}
    />
  );
}
