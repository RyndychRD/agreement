import { Input } from "antd";
import { useRef } from "react";

export default function RenderPhone(props) {
  const { elemNameForForm, defaultValue, form } = props;

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

  if (defaultValue) {
    form.setFieldValue(elemNameForForm, defaultValue);
  }

  const regex = /(.*?)Добавочный номер (\d+)/;
  const matches = defaultValue.match(regex);
  const mainNumber = matches ? matches[1].trim() : defaultValue;
  const extensionNumber = matches ? matches[2].trim() : "";

  // const { Option } = Select;
  return (
    <Input.Group compact>
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
  );
}
