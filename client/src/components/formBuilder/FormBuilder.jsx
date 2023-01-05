/* eslint-disable camelcase */
import { Button, Form, Modal } from "antd";
import { useState } from "react";
import {
  Provider,
  useCustomState,
  useCustomDispatch,
} from "./FormBuilderProvider";
import CustomInput from "./ElementsFormBuilder/FBCustomInput";
import RenderForm from "./RenderForm/FBRenderForm";
import "./FormBuilderStyle.css";

function CollectionCreateForm({ open, onCreate, onCancel }) {
  const [form] = Form.useForm();

  // const stateReact = useCustomState();
  const { FormBuilderData } = useCustomState();
  const dispatchReact = useCustomDispatch();
  console.log("CollectionCreateForm = > FormBuilderData", FormBuilderData);
  return (
    <Modal
      open={open}
      title="Создать новую форму"
      okText="Сохранить"
      cancelText="Закрыть"
      onCancel={() => {
        dispatchReact({ type: "CancelButton" });
        form.resetFields();
        onCancel();
      }}
      width="95%"
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onCreate(values);
            form.resetFields();
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      {FormBuilderData?.FormBuilder ? (
        <RenderForm
          form={form}
          FormBuilderData={FormBuilderData?.FormBuilder}
        />
      ) : (
        <CustomInput form={form} />
      )}
    </Modal>
  );
}

export default function FormBuilder() {
  const [open, setOpen] = useState(false);
  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setOpen(false);
  };

  return (
    <div>
      <Provider>
        <Button
          type="primary"
          onClick={() => {
            setOpen(true);
          }}
        >
          Создать новую форму
        </Button>
        <CollectionCreateForm
          open={open}
          onCreate={onCreate}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </Provider>
    </div>
  );
}
