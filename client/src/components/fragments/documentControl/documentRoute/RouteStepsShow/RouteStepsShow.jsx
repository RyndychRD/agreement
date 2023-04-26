import { useState } from "react";
import { Alert } from "antd";
import RouteStepShow from "./RouteStepShow";
import ButtonShowSigned from "./buttons/showSignedButton";
import ButtonShowUnsigned from "./buttons/showUnsignedButton";
import SignStep from "./modals/SignStep";
import SigningButtons from "./buttons/signingButtons";
import RejectDocumentModal from "./modals/RejectDocumentModal";

export default function RouteStepsShow({ routeSteps, isAbleToSign }) {
  const currentSignStep = routeSteps?.filter((el) => !el.actual_signer_id)[0];
  const signedSteps = routeSteps?.filter((el) => el.actual_signer_id);
  const isAnySignedSteps = signedSteps?.length > 0;
  const previousSignStep = signedSteps?.at(-1);
  const isAnyUnsignedSteps = currentSignStep;
  const documentId = currentSignStep?.document_id;

  // Показать все подписанные шаги если не подписанных не осталось
  // Если подписать невозможно, то показать подписанные шаги
  const [showSignedSteps, setShowSignedSteps] = useState(
    !isAnyUnsignedSteps || !isAbleToSign
  );

  // Показать все не подписанные шаги. Изначально показывает только следующий неподписанный шаг
  const [showUnsignedSteps, setShowUnsignedSteps] = useState(false);

  if (!routeSteps || routeSteps.length === 0) {
    return <Alert message="У документа отсутствует маршрут" type="error" />;
  }
  return (
    <>
      {isAnySignedSteps ? (
        <ButtonShowSigned
          setShowSignedSteps={setShowSignedSteps}
          showSignedSteps={showSignedSteps}
        />
      ) : (
        ""
      )}
      <div className="routeBlock">
        {routeSteps.map((routeStep) => (
          <RouteStepShow
            key={routeStep.step}
            routeStep={routeStep}
            showSignedSteps={showSignedSteps}
            showUnsignedSteps={showUnsignedSteps}
          />
        ))}
      </div>
      {isAnyUnsignedSteps ? (
        <ButtonShowUnsigned
          setShowUnsignedSteps={setShowUnsignedSteps}
          showUnsignedSteps={showUnsignedSteps}
        />
      ) : (
        ""
      )}
      {currentSignStep?.id && isAbleToSign ? (
        <>
          <SigningButtons
            // Чтобы вернуть назад, должен быть хотя бы один подписанный шаг
            isShowReturnBackOneStepButton={isAnySignedSteps}
            // Отклонить может любой подписант в списке
            isShowRejectButton
          />
          <SignStep
            currentStepId={currentSignStep?.id}
            previousSignStepId={previousSignStep?.id}
          />
          <RejectDocumentModal documentId={documentId} />
        </>
      ) : (
        ""
      )}
    </>
  );
}
