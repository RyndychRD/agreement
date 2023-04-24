import { Alert, Card } from "antd";
import {
  userNameMask,
  userNameWithPositionMask,
} from "../../../../../services/CommonFunctions";
import { renderDate } from "../../../tables/CommonFunctions";

function getNotSignedNoDeputyCard(step) {
  return (
    <div>
      <p>Должность подписанта: {step.signer.position_name}</p>
      <p>Имя подписанта: {userNameMask(step.signer)}</p>
    </div>
  );
}

function getNotSignedDeputyCard(step) {
  return (
    <div>
      <p>Должность предполагаемого подписанта: {step.signer.position_name}</p>
      <p>Имя предполагаемого подписанта: {userNameMask(step.signer)}</p>
      <p>
        Должность замещающего подписанта: {step.deputy_signer.position_name}
      </p>
      <p>Имя замещающего подписанта: {userNameMask(step.deputy_signer)}</p>
    </div>
  );
}

function getSignTypeMessage(documentSignatureType) {
  let type = "";
  const message = documentSignatureType?.name
    ? documentSignatureType.name
    : "Не подписано";
  switch (documentSignatureType?.id) {
    case 1:
      type = "success";
      break;
    case 2:
      type = "error";
      break;
    case 3:
      type = "warning";
      break;
    default:
      type = "info";
      break;
  }
  return (
    <Alert
      type={type}
      style={{ padding: "2px", width: "fit-content" }}
      message={message}
    />
  );
}

function getTitle(stepNumber, documentSignatureType) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>{`Шаг №${stepNumber}`}</div>
      {getSignTypeMessage(documentSignatureType)}
    </div>
  );
}

function getSignedCard(step) {
  return (
    <div>
      <p>
        {userNameWithPositionMask(step.actual_signer)} -{" "}
        {renderDate(step.sign_date)}
      </p>
      {step?.remark ? (
        <p>
          <i>{step.remark}</i>
        </p>
      ) : (
        ""
      )}
    </div>
  );
}

function getClassBySign(actualSignerId, showSignedSteps, showUnsignedSteps) {
  let result = "";
  if (actualSignerId) {
    result += "signed";
  } else {
    result += "not-signed";
  }
  if (showSignedSteps && actualSignerId) {
    result += " displayBlockImportant";
  }
  if (showUnsignedSteps && !actualSignerId) {
    result += " displayBlockImportant";
  }
  return result;
}

export default function RouteStepShow({
  routeStep,
  showSignedSteps,
  showUnsignedSteps,
  title,
  cardDataPassed = null,
}) {
  const {
    step: stepNumber,
    actual_signer_id: actualSignerId,
    deputy_signer_id: deputySignerId,
    signer_id: signerId,
    document_signature_type: documentSignatureType,
  } = routeStep;

  let cardData = null;
  // Наполняем карточку данными
  if (actualSignerId) {
    cardData = getSignedCard(routeStep);
  } else if (deputySignerId) {
    cardData = getNotSignedDeputyCard(routeStep);
  } else if (signerId) {
    cardData = getNotSignedNoDeputyCard(routeStep);
  }
  return (
    <Card
      className={` ${getClassBySign(
        actualSignerId,
        showSignedSteps,
        showUnsignedSteps
      )} routeCard `}
      key={`card ${stepNumber}`}
      size="small"
      title={title || getTitle(stepNumber, documentSignatureType)}
    >
      {cardDataPassed || cardData}
    </Card>
  );
}
