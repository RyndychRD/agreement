import { Button } from "antd";

/**
 * Скрывает и отображает неподписанные шаги
 * @param {*} param0.setShowUnsignedSteps setState отображения неподписанных шагов
 * @param {*} param0.showUnsignedSteps state отображения неподписанных шагов
 * @returns
 */
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
