import { TextOutputWithLabel } from "../../../../../fragments/outputs/textOutputs";
import { renderDate } from "../../../../../fragments/tables/CommonFunctions";

export default function CreateUpdateForm({ rawData }) {
  return (
    <>
      <TextOutputWithLabel label="Пользователь" text={rawData.user_fio} />
      <TextOutputWithLabel
        label="Тип действия"
        text={rawData.action_type_name}
      />
      <TextOutputWithLabel
        label="Дата создания"
        text={renderDate(rawData.created_at)}
      />
      <TextOutputWithLabel label="Действие" text={rawData.action} />
    </>
  );
}
