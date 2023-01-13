import RouteStepShow from "./RouteStepShow";

export default function RouteStepsShow({ routeSteps }) {
  return (
    <>
      <span>Маршрут документа</span>
      {routeSteps.map((step) => (
        <RouteStepShow key={step.step} step={step} />
      ))}
    </>
  );
}
