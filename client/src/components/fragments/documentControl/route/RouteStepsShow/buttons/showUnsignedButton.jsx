import { Button } from "antd";

export default function ButtonShowUnsigned({
  setShowUnsignedSteps,
  showUnsignedSteps,
}) {
  return (
    <Button
      className="buttonRow"
      type="info"
      onClick={() => {
        setShowUnsignedSteps(!showUnsignedSteps);
      }}
    >
      {`${showUnsignedSteps ? "Скрыть " : "Показать "} не подписанные шаги`}
    </Button>
  );
}
