import { useState } from "react";
import RouteStepShow from "./RouteStepShow";
import ButtonShowSigned from "./buttons/showSignedButton";
import ButtonShowUnsigned from "./buttons/showUnsignedButton";
import SignStep from "./modals/SignStep";
import SigningButtons from "./buttons/signingButtons";
import { HeaderTextOutput } from "../../../outputs/textOutputs";
import ChangeDocumentStatus from "./modals/ChangeDocumentStatus";

export default function RouteStepsShow({ routeSteps, isAbleToSign }) {
  const currentSignStep = routeSteps.filter((el) => !el.actual_signer_id)[0];
  const signedSteps = routeSteps.filter((el) => el.actual_signer_id);
  const isAnySignedSteps = signedSteps.length > 0;
  const previousSignStep = signedSteps?.at(-1);
  const isAnyUnsignedSteps = currentSignStep;
  const documentId = currentSignStep?.document_id;

  // Показать все подписанные шаги
  // Если подписать невозможно, то показать подписанные шаги
  const [showSignedSteps, setShowSignedSteps] = useState(
    !isAnySignedSteps || !isAbleToSign
  );

  // Показать все не подписанные шаги. Изначально показывает только следующий неподписанный шаг
  const [showUnsignedSteps, setShowUnsignedSteps] = useState(false);

  if (routeSteps.length === 0) {
    return <h3>У документа отсутствует маршрут</h3>;
  }
  return (
    <>
      <HeaderTextOutput text="Маршрут документа" />
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
            // Отклонить может только последний подписант в списке
            isShowRejectButton={!isAnyUnsignedSteps}
          />
          <SignStep
            currentStepId={currentSignStep?.id}
            previousSignStepId={previousSignStep?.id}
          />
          <ChangeDocumentStatus documentId={documentId} />
        </>
      ) : (
        ""
      )}
    </>
  );
}
