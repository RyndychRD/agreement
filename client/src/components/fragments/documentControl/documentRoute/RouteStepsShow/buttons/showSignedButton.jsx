import { Button } from "antd";

/**
 * Скрывает и отображает подписанные шаги
 * @param {*} param0.setShowSignedSteps setState отображения подписанных шагов
 * @param {*} param0.showSignedSteps state отображения подписанных шагов
 * @returns
 */
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
