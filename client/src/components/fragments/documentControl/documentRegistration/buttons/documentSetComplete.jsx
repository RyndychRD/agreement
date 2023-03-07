import { Form, Modal } from "antd";
import { useSetDocumentArchiveTypeMutationHook } from "../../../../../core/redux/api/DocumentControl/DocumentApi";
import SimpleSpinner from "../../../messages/Spinner";
import SimpleError from "../../../messages/Error";
import { SelectArchiveTypesFormItem } from "../../../inputs/byClass/archive";

export default function DocumentSetCompleteModal(props) {
  const { document, isOpen, setIsOpen, closeParentModalFunc } = props;
  const [form] = Form.useForm();
  const [
    updateMutation,
    { isLoading: isLoadingUpdate, isError: isErrorUpdate, reset: resetUpdate },
  ] = useSetDocumentArchiveTypeMutationHook();

  const onFinish = () => {
    form
      .validateFields()
      .then(async (values) => {
        const preparedValues = {
          ...values,
          documentId: document.id,
        };
        await updateMutation(preparedValues).unwrap();
        form.resetFields();
        if (!isErrorUpdate) {
          setIsOpen(false);
          closeParentModalFunc();
        }
      })
      .catch((info) => {
        console.log("Ошибка на форме создания:", info);
      });
  };

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
