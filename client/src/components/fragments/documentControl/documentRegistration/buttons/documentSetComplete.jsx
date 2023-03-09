import { Form, Modal } from "antd";
import {
  useSetDocumentArchiveTypeMutationHook,
  useUpdateDocumentMutation,
} from "../../../../../core/redux/api/DocumentControl/DocumentApi";
import SimpleSpinner from "../../../messages/Spinner";
import SimpleError from "../../../messages/Error";
import { SelectArchiveTypesFormItem } from "../../../inputs/byClass/archive";
import {
  HeaderTextOutput,
  SimpleTextOutput,
} from "../../../outputs/textOutputs";

// TODO: ОЧЕНЬ ПОХОЖЕ НА documentSetArchiveModal. Подумать над объединением
export default function DocumentSetCompleteModal(props) {
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
      newDocumentStatusId: 10,
      finishedAt: "now",
    };
    await updateDocumentMutation(valuesToSend).unwrap();
    if (!isErrorUpdateStatus) {
      setIsOpen(false);
      closeParentModalFunc();
    }
  };
  const onFinish = () => {
    form
      .validateFields()
      .then(async (values) => {
        const preparedValues = {
          ...values,
          documentId: document.id,
          isAddDelay: true,
        };
        await updateArchiveTypeMutation(preparedValues).unwrap();
        form.resetFields();
        if (!isErrorUpdate) {
          changeStatus();
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
      <HeaderTextOutput text="Выберите, в какой архив поместить документ через месяц" />
      <SimpleTextOutput text="Через месяц документ будет автоматически перемещен в архив. Вы также сможете переместить документ в архив самостоятельно. Выберите тип архива, в который необходимо поместить документ" />
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
