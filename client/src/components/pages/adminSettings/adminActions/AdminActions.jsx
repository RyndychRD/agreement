import { Button, Col, Row } from "antd";
import { HeaderTextOutput } from "../../../fragments/outputs/textOutputs";
import AdminActionsService from "../../../../services/AdminServices/AdminActionsService";

export default function AdminActions() {
  return (
    <>
      <HeaderTextOutput
        style={{ textAlign: "center" }}
        text="Список действий админа с сайтом"
      />
      <Row>
        <Col>
          <Button
            onClick={() => {
              AdminActionsService.notifySiteClose();
            }}
          >
            Оповестить пользователей о закрытии сайта
          </Button>
        </Col>
      </Row>
    </>
  );
}
