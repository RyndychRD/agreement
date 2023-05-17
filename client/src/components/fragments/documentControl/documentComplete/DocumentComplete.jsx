import { Button, Col, Row } from "antd";
// import { useState } from "react";
import {
  useGetDocumentQueryHook,
  useUpdateDocumentMutationHook,
} from "../../../../core/redux/api/DocumentControl/DocumentApi";
import SimpleSpinner from "../../messages/Spinner";
import SimpleError from "../../messages/Error";
import ModalConfirm from "../../modals/ModalConfirm";
// import DocumentSetCompleteModal from "./buttons/documentSetComplete";

/**
 * Кнопка перевода документа в статус Исполнен
 * @param {*} props.documentId id документа
 * @param {*} props.closeModalFunc функция закрытия модального окна
 * @returns
 */
export default function DocumentComplete(props) {
  const { documentId, closeModalFunc } = props;
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // prettier-ignore
  const {data: document = {},isLoading: isLoadingDocument,isError: isErrorDocument} = 
    useGetDocumentQueryHook({id: documentId,isAddForeignTables: true,});

  const isLoading = isLoadingDocument;
  const isError = isErrorDocument;

  const [updateDocumentMutation, { isError: isErrorUpdateStatus }] =
    useUpdateDocumentMutationHook();

  const changeStatus = async () => {
    const valuesToSend = {
      document_id: document.id,
      newDocumentStatusId: 10,
      finishedAt: "now",
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
      <Row className="mt-5">
        <Col push={7}>
          <Button
            type="primary"
            onClick={() => {
              ModalConfirm({
                content:
                  "Вы действительно хотите сменить статус документа на Исполнен?",
                onOk: () => {
                  changeStatus();
                },
              });
              // setIsModalOpen(true);
            }}
          >
            Документ исполнен
          </Button>
        </Col>
      </Row>

      {/* Настройка для автоматического перемещения в архив */}
      {/* TODO: При разблокировке также верни отображение срока перемещения в DocumentToArchiveShow */}
      {/* <DocumentSetCompleteModal
            document={document}
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            closeParentModalFunc={closeModalFunc}
          /> */}
    </>
  );
}
