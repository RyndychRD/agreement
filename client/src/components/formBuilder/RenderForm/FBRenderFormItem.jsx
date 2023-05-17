import { Form } from "antd";
import ReturnElement from "./FBReturnElement";
import "../FormBuilderStyle.css";

/**
 * Билдер элементов для заполнения
 * @param {*} props.FormBuilderData Данные, которые нужно отобразить. Обычно результат работы конструктора
 * @param {*} props.form Форма для заполнения
 * @returns
 */
export default function FormBuilderDataComponent(props) {
  const { FormBuilderData, form } = props;
  return FormBuilderData?.map((ComponentItem, index) => {
    const elemNameForForm = [index, "value"];
    /** Попытка избавится от варнингов. Не самое красивое решение, но по факту ни на что в проде не влияет, можно удалить */
    const keyIn = `${index}value`;
    const keyIn2 = `${index}value2`;
    const keyIn3 = `${index}value3`;
    const keyIn4 = `${index}value4`;
    const rules = [];
    if (ComponentItem.isFieldRequired)
      rules.push({
        required: true,
        message: "Данные не внесены",
      });

    const formItemProps = {
      key: keyIn,
      name: elemNameForForm,
      label: ComponentItem.label,
      labelCol: { span: 24 },
      rules,
    };
    return (
      <>
        <ReturnElement
          formItemProps={formItemProps}
          ComponentNameForForm={elemNameForForm}
          ComponentKey={ComponentItem.key}
          // Используется только в шаблонизаторе
          ComponentValue={ComponentItem?.value}
          title={ComponentItem.label}
          form={form}
        />
        {/* Так как у нас в document_values ожидается тип поля, его наименование и значение, то это просто дополнительные поля для соотнесения с текущим рассматриваемым значением */}
        <Form.Item
          hidden
          name={[index, "label"]}
          initialValue={ComponentItem.label}
          key={keyIn2}
        />
        <Form.Item
          hidden
          name={[index, "key"]}
          initialValue={ComponentItem.key}
          key={keyIn3}
        />
        <Form.Item
          hidden
          name={[index, "select_name"]}
          initialValue={ComponentItem.key}
          key={keyIn4}
        />
      </>
    );
  });
}
