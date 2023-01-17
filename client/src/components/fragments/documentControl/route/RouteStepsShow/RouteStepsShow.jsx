import { Button } from "antd";
import { useState } from "react";
import RouteStepShow from "./RouteStepShow";
import ButtonShowSigned from "./buttons/showSignedButton";
import ButtonShowUnsigned from "./buttons/showUnsignedButton";
import ConfirmAndRemark from "./modals/confirmAndRemark";
import { useRouteStepFragmentDispatch } from "../RouteStepFragmentProvider";

export default function RouteStepsShow({ routeSteps }) {
  const dispatch = useRouteStepFragmentDispatch();
  const [showSignedSteps, setShowSignedSteps] = useState(false);
  const [showUnsignedSteps, setShowUnsignedSteps] = useState(false);

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
      <ButtonShowUnsigned
        setShowUnsignedSteps={setShowUnsignedSteps}
        showUnsignedSteps={showUnsignedSteps}
      />
      <div className="mt-5">
        <Button
          onClick={() => {
            dispatch("openConfirmModal_Confirm");
          }}
          className="buttonRow"
          type="primary"
        >
          Согласовать
        </Button>
        <Button
          onClick={() => {
            dispatch("openConfirmModal_ConfirmWithRemark");
          }}
          className="buttonRow warning-button"
        >
          Согласовать с замечанием
        </Button>
        <Button
          onClick={() => {
            dispatch("openConfirmModal_RejectWithRemark");
          }}
          danger
        >
          Не согласовать
        </Button>
      </div>
      <ConfirmAndRemark />
    </>
  );
}
