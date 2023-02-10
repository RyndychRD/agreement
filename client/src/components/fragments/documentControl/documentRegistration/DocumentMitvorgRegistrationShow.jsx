import { Button, Col, Row } from "antd";
import {
  useGetDocumentQueryHook,
  useUpdateDocumentMutation,
} from "../../../../core/redux/api/DocumentControl/DocumentApi";
import SimpleSpinner from "../../messages/Spinner";
import SimpleError from "../../messages/Error";
import { TextOutputWithLabel } from "../../outputs/textOutputs";
import { renderDate } from "../../tables/CommonFunctions";

/**
 *
 * @param isShowReturnBackOneStepButton - Показать кнопку Вернуть на шаг назад
 * @param isShowRejectButton - Показать кнопку Отклонить
 * @returns
 */
export default function DocumentMitvorgRegistrationShow(props) {
  const { documentId, closeModalFunc, isAddButton = false } = props;

  // prettier-ignore
  const {data: document = {},isLoading: isLoadingDocument,isError: isErrorDocument} = 
    useGetDocumentQueryHook({id: documentId,isAddForeignTables: true,});
  // prettier-ignore
  const [updateFunc, { isLoading: isLoadingUpdate, isError: isErrorUpdate }] = 
    useUpdateDocumentMutation();

  const onClick = async () => {
    const valuesToSend = {
      document_id: documentId,
      newDocumentStatusId: 10,
    };
    await updateFunc(valuesToSend).unwrap();
    if (!isErrorUpdate) {
      closeModalFunc();
    }
  };

  const isLoading = isLoadingDocument || isLoadingUpdate;
  const isError = isErrorDocument || isErrorUpdate;
  if (isLoading) return <SimpleSpinner />;
  if (isError) return <SimpleError />;

  return (
    <>
      <TextOutputWithLabel
        label="Дата регистрации в Митворг"
        text={renderDate(document.document_mitvorg_registration_date, false)}
      />
      <TextOutputWithLabel
        label="Митворг номер"
        text={document.document_mitvorg_number}
      />
      {isAddButton ? (
        <Row className="mt-5">
          <Col push={7}>
            <Button type="primary" onClick={onClick}>
              Документ исполнен
            </Button>
          </Col>
        </Row>
      ) : (
        ""
      )}
    </>
  );
}
