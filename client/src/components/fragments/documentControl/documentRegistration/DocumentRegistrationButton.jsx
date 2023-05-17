import { Button } from "antd";
import { useUpdateDocumentMutation } from "../../../../core/redux/api/DocumentControl/DocumentApi";
import SimpleSpinner from "../../messages/Spinner";
import SimpleError from "../../messages/Error";
import ModalConfirm from "../../modals/ModalConfirm";

/**
 * Кнопка перевода в статус Документ в ООПЗ
 * @param {*} props.documentId id документа для перевода в новый статус
 * @param {*} props.closeModalFunc функция закрытия родительского окна документа
 * @returns
 */
export default function DocumentRegistrationButton(props) {
  const { documentId, closeModalFunc } = props;
  const [updateFunc, { isLoading, isError }] = useUpdateDocumentMutation();
  const valuesToSend = {
    document_id: documentId,
    newDocumentStatusId: 8,
  };

  return (
    <>
      <Button
        onClick={() =>
          ModalConfirm({
            content:
              "Вы точно хотите отправить документ на регистрацию в ООПЗ?",
            onOk: async () => {
              await updateFunc(valuesToSend).unwrap();
              if (!isError && !isLoading) {
                closeModalFunc();
              }
            },
            okText: "Да",
            cancelText: "Нет",
          })
        }
        className="buttonRow"
        type="primary"
      >
        Отправить на регистрацию
      </Button>
      {isLoading ? <SimpleSpinner /> : ""}
      {isError ? <SimpleError /> : ""}
    </>
  );
}
