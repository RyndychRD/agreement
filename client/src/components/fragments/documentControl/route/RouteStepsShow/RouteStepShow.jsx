import { Alert, Card } from "antd";
import { userNameMask } from "../../../../../services/CommonFunctions";
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

function getSignedCard(step) {
  if (step.actual_signer_id === step.signer_id) {
    return (
      <div>
        <p>Должность подписанта: {step.actual_signer.position_name}</p>
        <p>Имя подписанта: {userNameMask(step.actual_signer)}</p>
        <p>Дата подписания: {renderDate(step.sign_date)}</p>
        {step?.remark ? <p>Замечание: {step.remark}</p> : ""}
      </div>
    );
  }
  if (step.actual_signer_id === step.deputy_signer_id) {
    return (
      <div>
        <p>
          Должность замещающего подписанта: {step.actual_signer.position_name}
        </p>
        <p>Имя замещающего подписанта: {userNameMask(step.actual_signer)}</p>
        <p>Дата подписания: {renderDate(step.sign_date)}</p>
        {step?.remark ? <p>Замечание: {step.remark}</p> : ""}
      </div>
    );
  }
  if (step.deputy_signer_id) {
    return (
      <div>
        <p>
          Должность предполагаемого замещающего подписанта:
          {step.deputy_signer.position_name}
        </p>
        <p>
          Имя предполагаемого замещающего подписанта:
          {userNameMask(step.deputy_signer)}
        </p>
        <p>
          Должность фактического подписанта: {step.actual_signer.position_name}
        </p>
        <p>Имя фактического подписанта: {userNameMask(step.actual_signer)}</p>
        <p>Дата подписания: {renderDate(step.sign_date)}</p>
        {step?.remark ? <p>Замечание: {step.remark}</p> : ""}
      </div>
    );
  }
  return (
    <div>
      <p>Должность предполагаемого подписанта: {step.signer.position_name}</p>
      <p>Имя предполагаемого подписанта: {userNameMask(step.signer)}</p>
      <p>
        Должность фактического подписанта: {step.actual_signer.position_name}
      </p>
      <p>Имя фактического подписанта: {userNameMask(step.actual_signer)}</p>
      <p>Дата подписания: {renderDate(step.sign_date)}</p>
      {step?.remark ? <p>Замечание: {step.remark}</p> : ""}
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
  return <Alert type={type} style={{ padding: "2px" }} message={message} />;
}

function getTitle(stepNumber, documentSignatureType) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>{`Шаг №${stepNumber}`}</div>
      {getSignTypeMessage(documentSignatureType)}
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
}) {
  const {
    step: stepNumber,
    actual_signer_id: actualSignerId,
    deputy_signer_id: deputySignerId,
    signer_id: signerId,
    document_signature_type: documentSignatureType,
  } = routeStep;

  // Наполняем карточку данными
  let cardData = null;
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
      title={getTitle(stepNumber, documentSignatureType)}
    >
      {cardData}
    </Card>
  );
}
