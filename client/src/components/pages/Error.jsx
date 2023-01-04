import { AAlert } from "../adapter";

export function Error404() {
  return <AAlert message="Страница не найдена" type="error" />;
}
export function Error403() {
  return <AAlert message="Не хватает прав" type="error" />;
}
