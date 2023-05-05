import { AutoComplete, Form } from "antd";

export default function RenderSelectID(props) {
  const { elemNameForForm, form, formItemProps, CurrentElement } = props;

  const CurrentElementSelect = CurrentElement?.select_value?.select_id;
  const setValueInSelectOnForm = (value) => {
    form.setFieldValue(elemNameForForm, value);
  };

  return (
    <Form.Item {...formItemProps}>
      <AutoComplete
        optionFilterProp="children"
        onSelect={setValueInSelectOnForm}
        onChange={setValueInSelectOnForm}
        filterOption={(input, option) =>
          (option?.label.toLowerCase() ?? "").includes(input.toLowerCase())
        }
        // defaultValue={defaultValue}
        // name={elemNameForForm}
        id={elemNameForForm}
        options={CurrentElementSelect}
      />
    </Form.Item>
  );
}
