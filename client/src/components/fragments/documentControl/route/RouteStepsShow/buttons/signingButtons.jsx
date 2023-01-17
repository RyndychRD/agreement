import { Button } from "antd";
import { useRouteStepFragmentDispatch } from "../../RouteStepFragmentProvider";

export default function SigningButtons() {
  const dispatch = useRouteStepFragmentDispatch();
  return (
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
  );
}
