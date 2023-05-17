import { Button, Form, Modal } from "antd";
import { useState } from "react";
import { useAddDocumentFilesMutationHook } from "../../../../core/redux/api/DocumentControl/DocumentApi";
import FragmentFileUploader from "../../file/FragmentFileUploader";
import ModalConfirm from "../../modals/ModalConfirm";

/**
 * Компонент с модальным окном для догрузки файлов в документ. Сделан отдельно, чтобы отделить уже загруженные файлы документа от новых, еще не добавленных в документ файлов
 * @param {*} props.open Открыто ли модальное окно
 * @param {*} props.setOpen Функция закрытия модального окна
 * @param {*} props.documentId id документа, к которому будут ассоциироваться файлы после согласия пользователя
 * @returns
 */
export default function DocumentFilesEditModal(props) {
  const { open: isOpen, setOpen, documentId } = props;
  const [addFiles] = useAddDocumentFilesMutationHook();
  const [form] = Form.useForm();
  const onFinish = () => {
    form
      .validateFields()
      .then(async (values) => {
        const preparedValues = {
          documentId,
          documentFileIds: values.files.fileList.map((file) => ({
            id: file.response.fileId,
          })),
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
      open={isOpen}
      onOk={() => {
        ModalConfirm({
          onOk: onFinish,
          content:
            "После загрузки файла в документ вы не сможете его удалить. Вы точно хотите продолжить?",
        });
      }}
      onCancel={() => {
        setOpen(false);
      }}
      cancelText="Закрыть"
      okText="Сохранить"
    >
      <Form form={form} name="document_edit_file_modal" autoComplete="off">
        <FragmentFileUploader />
      </Form>
    </Modal>
  );
}

/**
 * Компонент с кнопкой и возможностью вызова модального окна для догрузки файлов в документ
 * @param {*} props.documentId id документа, в который мы будем загружать документы
 * @returns
 */
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
