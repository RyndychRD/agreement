import { Form, Select } from "antd";
import { useGetDocumentIODictionaryElementsHook } from "../../../../core/redux/api/AdminSettings/Constructor/formConstructor/DocumentIODictionaryElementApi";

export default function SelectElementForm({ restField, name }) {
  const { data: DocumentElementIODictionaries = [] } =
    useGetDocumentIODictionaryElementsHook();

  const options = DocumentElementIODictionaries.map((i) => {
    const typeNameDict = {
      text: "Ввод текста",
      table: `Выбор из таблицы ${i?.select_value?.table}`,
      select_id: "Выбор из вариантов и ввод своего",
      datePicker: "Выбор даты",
      phone: "Ввод телефона",
      number: "Ввод числа",
      email: "Ввод Email",
    };
    return {
      value: i.key,
      label: `${i.name} ${typeNameDict[i.data_type]}`,
    };
  });

  return (
    <Form.Item
      {...restField}
      name={[name, "key"]}
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
