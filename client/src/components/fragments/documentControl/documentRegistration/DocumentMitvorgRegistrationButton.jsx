import { Button, Modal } from "antd";
import { useUpdateDocumentMutation } from "../../../../core/redux/api/DocumentControl/DocumentApi";
import SimpleSpinner from "../../messages/Spinner";
import SimpleError from "../../messages/Error";

/**
 *
 * @param isShowReturnBackOneStepButton - Показать кнопку Вернуть на шаг назад
 * @param isShowRejectButton - Показать кнопку Отклонить
 * @returns
 */
export default function DocumentMitvorgRegistrationButton(props) {
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
          Modal.confirm({
            title: "Подтверждение",
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
