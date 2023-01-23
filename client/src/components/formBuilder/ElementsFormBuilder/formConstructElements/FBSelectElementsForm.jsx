import { Form, Select } from "antd";
import { useGetDocumentIODictionaryElementsHook } from "../../../../core/redux/api/AdminSettings/Constructor/formConstructor/DocumentIODictionaryElementApi";

export default function SelectElementForm({ restField, name }) {
  const { data: DocumentElementIODictionaries = [] } =
    useGetDocumentIODictionaryElementsHook();

  const options = DocumentElementIODictionaries.map((i) => ({
    value: i.key,
    label: i.name,
  }));

  return (
    <Form.Item
      {...restField}
      name={[name, "AreaType"]}
      rules={[
        {
          required: true,
          message: "Данные не внесены",
        },
      ]}
    >
      <Select
        showSearch
        className="selectInput"
        placeholder="Выберите элемент"
        optionFilterProp="children"
        filterOption={(input, option) =>
          (option?.label.toLowerCase() ?? "").includes(input.toLowerCase())
        }
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        options={options}
      />
    </Form.Item>
  );
}
