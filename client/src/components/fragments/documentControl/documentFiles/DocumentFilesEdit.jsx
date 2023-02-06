import { Button, Form, Modal } from "antd";
import { useState } from "react";
import { useAddDocumentFilesMutationHook } from "../../../../core/redux/api/DocumentControl/DocumentApi";
import FileInput from "../../file/FragmentFileUploader";

export default function DocumentFilesEditModal(props) {
  const { open, setOpen, documentId } = props;
  const [addFiles] = useAddDocumentFilesMutationHook();
  const [form] = Form.useForm();
  const onFinish = () => {
    form
      .validateFields()
      .then(async (values) => {
        const preparedValues = {
          documentId,
          documentFileIds: values.files.fileList.map(
            (file) => file.response.fileId
          ),
        };
        addFiles(preparedValues);
        form.resetFields();
        setOpen(false);
      })
      .catch((info) => {
        console.log("Ошибка на форме создания:", info);
      });
  };
  return (
    <Modal
      open={open}
      onOk={onFinish}
      onCancel={() => {
        setOpen(false);
      }}
      cancelText="Закрыть"
      okText="Сохранить"
    >
      <Form form={form} name="document_edit_file_modal" autoComplete="off">
        <FileInput />
      </Form>
    </Modal>
  );
}

export function DocumentFilesEdit(props) {
  const { documentId } = props;
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
        className="mt-5"
      >
        Добавить документы
      </Button>
      <DocumentFilesEditModal
        open={open}
        setOpen={setOpen}
        documentId={documentId}
      />
    </>
  );
}
