import { Form, Modal } from "antd";
import {
  useSetDocumentArchiveTypeMutationHook,
  useUpdateDocumentMutation,
} from "../../../../../core/redux/api/DocumentControl/DocumentApi";
import SimpleSpinner from "../../../messages/Spinner";
import SimpleError from "../../../messages/Error";
import { SelectArchiveTypesFormItem } from "../../../inputs/byClass/archive";
import { HeaderTextOutput } from "../../../outputs/textOutputs";

export default function DocumentSetArchiveModal(props) {
  const { document, isOpen, setIsOpen, closeParentModalFunc } = props;

  const [form] = Form.useForm();
  const [
    updateArchiveTypeMutation,
    { isLoading: isLoadingUpdate, isError: isErrorUpdate, reset: resetUpdate },
  ] = useSetDocumentArchiveTypeMutationHook();
  const [updateDocumentMutation, { isError: isErrorUpdateStatus }] =
    useUpdateDocumentMutation();

  const changeStatus = async () => {
    const valuesToSend = {
      document_id: document.id,
      newDocumentStatusId: 11,
    };
    await updateDocumentMutation(valuesToSend).unwrap();
    if (!isErrorUpdateStatus) {
      setIsOpen(false);
      closeParentModalFunc();
    }
  };

  const setDocumentArchiveType = async (values) => {
    const preparedValues = {
      ...values,
      documentId: document.id,
    };
    await updateArchiveTypeMutation(preparedValues).unwrap();
    form.resetFields();
    if (!isErrorUpdate) {
      changeStatus();
    }
  };

  const onFinish = () => {
    form
      .validateFields()
      .then(async (values) => {
        Modal.confirm({
          title: "Подтверждение",
          content:
            "Вы действительно хотите досрочно поместить документ в архив?",
          onOk: () => {
            setDocumentArchiveType(values);
          },
          okText: "Да, я хочу поместить документ в архив",
          cancelText: "Нет",
        });
      })
      .catch((info) => {
        console.log("Ошибка на форме создания:", info);
      });
  };

  if (isOpen) {
    form.setFieldValue("archiveTypeId", document.document_archive_type_id);
  }
  return (
    <Modal
      okText="Поместить в архив"
      cancelText="Отмена"
      destroyOnClose
      onCancel={() => {
        form.resetFields();
        resetUpdate();
        setIsOpen(false);
      }}
      onOk={onFinish}
      open={isOpen}
    >
      <HeaderTextOutput text="Выберите, в какой архив поместить документ" />

      {isLoadingUpdate ? <SimpleSpinner /> : ""}
      {isErrorUpdate ? <SimpleError /> : ""}
      <Form
        form={form}
        name="document_transfer_to_archive_modal"
        autoComplete="off"
      >
        <SelectArchiveTypesFormItem />
      </Form>
    </Modal>
  );
}
