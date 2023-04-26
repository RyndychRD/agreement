import { Alert, Button, Col, Row } from "antd";
import { useRouteStepFragmentDispatch } from "../../RouteStepFragmentProvider";
import { isAccessGranted } from "../../../../../../services/userAccessService";

/**
 *
 * @param isShowReturnBackOneStepButton - Показать кнопку Вернуть на шаг назад
 * @param isShowRejectButton - Показать кнопку Отклонить
 * @returns
 */
export default function SigningButtons(props) {
  const { isShowReturnBackOneStepButton, isShowRejectButton } = props;
  const dispatch = useRouteStepFragmentDispatch();

  if (!isAccessGranted("CanSignDocuments"))
    return (
      <Alert
        type="info"
        message="Вам запрещено подписание документов. Обратитесь к администратору"
      />
    );
  return (
    <>
      <Row>
        <Col>
          <Button
            onClick={() => {
              dispatch({ type: "openConfirmModal_Confirm" });
            }}
            className="buttonRow"
            type="primary"
          >
            Согласовать
          </Button>
        </Col>
        <Col>
          <Button
            onClick={() => {
              dispatch({ type: "openConfirmModal_ConfirmWithRemark" });
            }}
            className="buttonRow warning-button"
          >
            Согласовать с замечанием
          </Button>
        </Col>
        <Col>
          <Button
            onClick={() => {
              dispatch({ type: "openConfirmModal_RejectWithRemark" });
            }}
            danger
          >
            Не согласовать
          </Button>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <Button
            onClick={() => {
              dispatch({ type: "openConfirmModal_ReturnToRework" });
            }}
            className="buttonRow warning-button"
          >
            Вернуть на доработку
          </Button>
        </Col>
        {isShowReturnBackOneStepButton ? (
          <Col>
            <Button
              onClick={() => {
                dispatch({ type: "openConfirmModal_ReturnStepBack" });
              }}
              className="buttonRow warning-button"
            >
              Вернуть на шаг назад
            </Button>
          </Col>
        ) : (
          ""
        )}
        {isShowRejectButton ? (
          <Col>
            <Button
              onClick={() => {
                dispatch({ type: "openConfirmModal_Reject" });
              }}
              danger
            >
              Отклонить
            </Button>
          </Col>
        ) : (
          ""
        )}
      </Row>
    </>
  );
}
