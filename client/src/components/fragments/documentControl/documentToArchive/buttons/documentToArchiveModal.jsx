import { Form, Modal } from "antd";
import { useSetDocumentArchiveTypeAndChangeStatusMutationHook } from "../../../../../core/redux/api/DocumentControl/DocumentApi";
import { useGetArchiveTypesQueryHook } from "../../../../../core/redux/api/Globals/Catalogs/ArchiveTypeApi";
import SelectInputFormItem from "../../../inputs/selectInputs";
import SimpleSpinner from "../../../messages/Spinner";
import SimpleError from "../../../messages/Error";

export default function DocumentToArchiveModal(props) {
  const { document, isOpen, setIsOpen, closeParentModalFunc } = props;
  const [form] = Form.useForm();
  const {
    data: archiveTypes = [],
    isLoading: isLoadingArchiveTypes,
    isError: isErrorArchiveTypes,
  } = useGetArchiveTypesQueryHook();
  const [
    updateMutation,
    { isLoading: isLoadingUpdate, isError: isErrorUpdate, reset: resetUpdate },
  ] = useSetDocumentArchiveTypeAndChangeStatusMutationHook();

  const transferDocumentToArchive = async (values) => {
    const preparedValues = {
      ...values,
      // Ставим статус Архив
      newDocumentStatusId: 11,
      documentId: document.id,
    };
    console.log(preparedValues);
    await updateMutation(preparedValues).unwrap();
    form.resetFields();
    if (!isErrorUpdate) {
      setIsOpen(false);
      closeParentModalFunc();
    }
  };

  const onFinish = () => {
    form
      .validateFields()
      .then(async (values) => {
        Modal.confirm({
          title: "Подтверждение",
          content: "Вы действительно хотите поместить документ в архив?",
          onOk: () => {
            transferDocumentToArchive(values);
          },
          okText: "Да, я хочу поместить документ в архив",
          cancelText: "Нет",
        });
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
        <SelectInputFormItem
          title="Тип архива"
          isLoading={isLoadingArchiveTypes}
          isError={isErrorArchiveTypes}
          name="archiveTypeId"
          options={archiveTypes}
          rules={[
            {
              required: true,
              message: "Выберите тип архива",
            },
          ]}
        />
      </Form>
    </Modal>
  );
}
