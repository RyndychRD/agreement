// import { useState, useRef } from "react";
import { Form, Input } from "antd";
// import { MailTwoTone } from "@ant-design/icons";
// import "./FBEmailInput.css";

export default function RenderEmailInput(props) {
  const { elemNameForForm, defaultValue, form, formItemProps } = props;

  // const [statusWarningEmail, setWarning] = useState("empty-email");
  // const valueEmail = useRef();
  const verifyEmail = (e) => {
    const { value } = e.target;
    form.setFieldValue(elemNameForForm, value);
    // if (value === "" || value === " ") {
    //   setWarning("empty-email");
    // } else {
    //   const reg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    //   if (reg.test(value)) {
    //     setWarning("good-email");
    //   } else setWarning("warning-email");
    // }
  };

  return (
    // <div className={statusWarningEmail}>
    <Form.Item {...formItemProps}>
      <Input
        // ref={valueEmail}
        defaultValue={defaultValue}
        // prefix={<MailTwoTone />}
        id={elemNameForForm}
        placeholder="Электронная почта"
        onChange={verifyEmail}
      />
    </Form.Item>
  );
}
