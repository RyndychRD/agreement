import { Select, Input } from "antd";
import { useRef } from "react";
import FBElementLayout from "../FBElementLayout";

export default function RenderPhone(props) {
  const { elemNameForForm, form, title } = props;

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
    console.log(PhoneBodyRef.current);
    form.setFieldValue(elemNameForForm, PhoneBodyRef.current);
  }
  const setValueInCustomPhoneCodeCountryOnForm = (value) => {
    CustomPhoneCodeCountryRef.current = value;
    setPhoneBodyRef(value);
  };
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

  const { Option } = Select;
  return (
    <FBElementLayout name={title}>
      <Input.Group compact>
        <Select
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
        </Select>
        <Input
          onChange={setValueInCustomPhoneBodyOnForm}
          style={{
            width: "35%",
          }}
          placeholder="(###)#######"
          defaultValue=""
        />
        <Input
          onChange={setValueInCustomPhoneAdditionalOnForm}
          style={{
            width: "30%",
          }}
          placeholder="Добавочный номер"
          defaultValue=""
        />
      </Input.Group>
    </FBElementLayout>
  );
}
