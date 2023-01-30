import { Button } from "antd";

export default function ButtonShowSigned({
  setShowSignedSteps,
  showSignedSteps,
}) {
  return (
    <Button
      className="buttonRow"
      onClick={() => {
        setShowSignedSteps(!showSignedSteps);
      }}
      type="info"
    >
      {`${showSignedSteps ? "Скрыть " : "Показать "}подписанные шаги`}
    </Button>
  );
}
