import { useState } from "react";
import RouteStepShow from "./RouteStepShow";
import ButtonShowSigned from "./buttons/showSignedButton";
import ButtonShowUnsigned from "./buttons/showUnsignedButton";
import ConfirmAndRemark from "./modals/confirmAndRemark";
import SigningButtons from "./buttons/signingButtons";

export default function RouteStepsShow({ routeSteps, isAbleToSign }) {
  const currentSignStep = routeSteps.filter((el) => !el.actual_signer_id)[0];
  const isAnySignedSteps = routeSteps.find((el) => el.actual_signer_id);
  const isAnyUnsignedSteps = currentSignStep;

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
      <h3>Маршрут документа</h3>
      {isAnySignedSteps ? (
        <ButtonShowSigned
          setShowSignedSteps={setShowSignedSteps}
          showSignedSteps={showSignedSteps}
        />
      ) : (
        ""
      )}
      <div className="routeBlock">
        {routeSteps.map((step) => (
          <RouteStepShow
            key={step.step}
            step={step}
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
          <SigningButtons />
          <ConfirmAndRemark currentStepId={currentSignStep?.id} />
        </>
      ) : (
        ""
      )}
    </>
  );
}
