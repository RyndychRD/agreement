import { Button, Col, Row } from "antd";
import { useState } from "react";
import { useGetDocumentQueryHook } from "../../../../core/redux/api/DocumentControl/DocumentApi";
import SimpleSpinner from "../../messages/Spinner";
import SimpleError from "../../messages/Error";
import { TextOutputWithLabel } from "../../outputs/textOutputs";
import { renderDate } from "../../tables/CommonFunctions";
import DocumentSetCompleteModal from "./buttons/documentSetComplete";

/**
 *
 * @param isShowReturnBackOneStepButton - Показать кнопку Вернуть на шаг назад
 * @param isShowRejectButton - Показать кнопку Отклонить
 * @returns
 */
export default function DocumentRegistrationShow(props) {
  const { documentId, closeModalFunc, isAddButton = false } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  // prettier-ignore
  const {data: document = {},isLoading: isLoadingDocument,isError: isErrorDocument} = 
    useGetDocumentQueryHook({id: documentId,isAddForeignTables: true,});

  const isLoading = isLoadingDocument;
  const isError = isErrorDocument;
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
        <>
          <Row className="mt-5">
            <Col push={7}>
              <Button
                type="primary"
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                Документ исполнен
              </Button>
            </Col>
          </Row>
          <DocumentSetCompleteModal
            document={document}
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            closeParentModalFunc={closeModalFunc}
          />
        </>
      ) : (
        ""
      )}
    </>
  );
}