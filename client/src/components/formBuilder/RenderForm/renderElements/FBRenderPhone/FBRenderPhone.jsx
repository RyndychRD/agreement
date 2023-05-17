import { Form, Input } from "antd";
import { useRef } from "react";

/**
 * Рендерит поле для ввода телефона
 * @param {*} props.elemNameForForm имя в Form
 * @param {*} props.formItemProps Дополнительные флаги в Form.Item
 * @param {*} props.form Родительская форма. Нужна для записи в нее значения при каждом изменении email
 * @param {*} props.defaultValue Изначальное значение. Так как изначальное значение представлено в виде 89143215741 Добавочный номер 2222, при отображении заполненной информации нужно разбить строку на 2 составляющие с разделителем Добавочный номер
 * @returns
 */
export default function RenderPhone(props) {
  const { elemNameForForm, defaultValue, form, formItemProps } = props;

  const PhoneBodyRef = useRef("");
  const CustomPhoneCodeCountryRef = useRef("");
  const CustomPhoneBodyRef = useRef("");
  const CustomPhoneAdditionalNumberRef = useRef("");

  function setPhoneBodyRef() {
    PhoneBodyRef.current = `${
      CustomPhoneCodeCountryRef.current ? CustomPhoneCodeCountryRef.current : ""
    }${CustomPhoneBodyRef.current ? CustomPhoneBodyRef.current : ""}${
      CustomPhoneAdditionalNumberRef.current
        ? CustomPhoneAdditionalNumberRef.current
        : ""
    }`;
    form.setFieldValue(elemNameForForm, PhoneBodyRef.current);
  }
  // const setValueInCustomPhoneCodeCountryOnForm = (value) => {
  //   CustomPhoneCodeCountryRef.current = value;
  //   setPhoneBodyRef(value);
  // };
  const setValueInCustomPhoneBodyOnForm = (e) => {
    e.stopPropagation();
    const { value } = e.target;
    CustomPhoneBodyRef.current = value;
    setPhoneBodyRef(value);
  };
  const setValueInCustomPhoneAdditionalOnForm = (e) => {
    e.stopPropagation();
    const { value } = e.target;
    CustomPhoneAdditionalNumberRef.current = ` Добавочный номер ${value} `;
    setPhoneBodyRef(value);
  };

  let mainNumber = "";
  let extensionNumber = "";
  if (defaultValue) {
    const regex = /(.*?)Добавочный номер (\d+)/;
    const matches = defaultValue.match(regex);
    extensionNumber = matches ? matches[2].trim() : "";
    mainNumber = matches ? matches[1].trim() : defaultValue;
  }

  // const { Option } = Select;
  return (
    <>
      {/* <Input.Group compact> */}
      {/* <Select
        onChange={setValueInCustomPhoneCodeCountryOnForm}
        style={{
          width: "35%",
        }}
        defaultValue="Коды стран"
      >
        <Option value="">Не указан</Option>
        <Option value="+7">+7 Россия/Казахстан</Option>
        <Option value="+86">+86 Китай</Option>
        <Option value="+375">+375 Беларусь</Option>
        <Option value="+380">+380 Украина</Option>
      </Select> */}
      <Form.Item {...formItemProps}>
        <Input.Group compact>
          <Input
            onChange={setValueInCustomPhoneBodyOnForm}
            style={{
              // width: "35%",
              width: "70%",
            }}
            placeholder="(###)#######"
            defaultValue={mainNumber}
          />
          <Input
            onChange={setValueInCustomPhoneAdditionalOnForm}
            style={{
              width: "30%",
            }}
            placeholder="Добавочный номер"
            defaultValue={extensionNumber}
          />
        </Input.Group>
      </Form.Item>
    </>
  );
}
