import { Button, Col, Row } from "antd";
import {
  useGetDocumentQueryHook,
  useUpdateDocumentMutationHook,
} from "../../../../core/redux/api/DocumentControl/DocumentApi";
import SimpleSpinner from "../../messages/Spinner";
import SimpleError from "../../messages/Error";
import { TextOutputWithLabel } from "../../outputs/textOutputs";
import { renderDate } from "../../tables/CommonFunctions";
import ModalConfirm from "../../modals/ModalConfirm";

/**
 * Фрагмент для отображения данных по регистрации и , при желании, перевода в статус Действующий
 * @param {*} props.documentId id документа для отображения информации
 * @param {*} props.closeModalFunc функция закрытия родительского окна
 * @param {*} props.isAddButton добавить ли кнопку для перевода в статус Действующий
 * @returns
 */
export default function DocumentRegistrationShow(props) {
  const { documentId, closeModalFunc, isAddButton = false } = props;
  const {
    data: document = {},
    isLoading: isLoadingDocument,
    isError: isErrorDocument,
  } = useGetDocumentQueryHook({ id: documentId, isAddForeignTables: true });

  const isLoading = isLoadingDocument;
  const isError = isErrorDocument;

  const [updateDocumentMutation, { isError: isErrorUpdateStatus }] =
    useUpdateDocumentMutationHook();

  const changeStatus = async () => {
    const valuesToSend = {
      document_id: document.id,
      newDocumentStatusId: 12,
    };
    await updateDocumentMutation(valuesToSend).unwrap();
    if (!isErrorUpdateStatus) {
      closeModalFunc();
    }
  };

  if (isLoading) return <SimpleSpinner />;
  if (isError) return <SimpleError />;

  return (
    <>
      <TextOutputWithLabel
        label="Дата регистрации"
        text={renderDate(document.document_registration_date, false)}
      />
      <TextOutputWithLabel
        label="Номер документа"
        text={document.document_registration_number}
      />
      {isAddButton ? (
        <Row className="mt-5">
          <Col push={5}>
            <Button
              type="primary"
              onClick={() => {
                ModalConfirm({
                  content:
                    "Вы действительно хотите сменить статус документа на Действующий?",
                  onOk: () => {
                    changeStatus();
                  },
                });
                // setIsModalOpen(true);
              }}
            >
              Перевести в действующие документы
            </Button>
          </Col>
        </Row>
      ) : (
        ""
      )}
    </>
  );
}
