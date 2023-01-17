import { useState } from "react";
import RouteStepShow from "./RouteStepShow";
import ButtonShowSigned from "./buttons/showSignedButton";
import ButtonShowUnsigned from "./buttons/showUnsignedButton";
import ConfirmAndRemark from "./modals/confirmAndRemark";
import SigningButtons from "./buttons/signingButtons";

export default function RouteStepsShow({ routeSteps, isAbleToSign }) {
  const currentSignStep = routeSteps.filter((el) => !el.actual_signer_id)[0];
  const [showSignedSteps, setShowSignedSteps] = useState(
    !currentSignStep?.id || !isAbleToSign
  );
  const [showUnsignedSteps, setShowUnsignedSteps] = useState(!isAbleToSign);

  if (routeSteps.length === 0) {
    return <h3>У документа отсутствует маршрут</h3>;
  }
  return (
    <>
      <h3>Маршрут документа</h3>
      <ButtonShowSigned
        setShowSignedSteps={setShowSignedSteps}
        showSignedSteps={showSignedSteps}
      />
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
      {currentSignStep?.id && isAbleToSign ? (
        <>
          <ButtonShowUnsigned
            setShowUnsignedSteps={setShowUnsignedSteps}
            showUnsignedSteps={showUnsignedSteps}
          />
          <SigningButtons />
          <ConfirmAndRemark currentStepId={currentSignStep?.id} />
        </>
      ) : (
        ""
      )}
    </>
  );
}
