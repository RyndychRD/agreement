import { useState, useRef } from "react";
import { Input } from "antd";
import { MailTwoTone } from "@ant-design/icons";
import "./FBEmailInput.css";
import FBElementLayout from "../FBElementLayout";

export default function RenderEmailInput(props) {
  const { elemNameForForm, title } = props;

  const [statusWarningEmail, setWarning] = useState("empty-email");
  const valueEmail = useRef();
  const verifyEmail = (e) => {
    const { value } = e.target;
    if (value === "" || value === " ") {
      setWarning("empty-email");
    } else {
      const reg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (reg.test(value)) {
        setWarning("good-email");
      } else setWarning("warning-email");
    }
  };
  return (
    <FBElementLayout name={title}>
      <div className={statusWarningEmail}>
        <Input
          ref={valueEmail}
          prefix={<MailTwoTone />}
          id={elemNameForForm}
          placeholder="Электронная почта"
          onChange={verifyEmail}
        />
      </div>
    </FBElementLayout>
  );
}
