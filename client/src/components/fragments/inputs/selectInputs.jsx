import { Form, Select } from "antd";
import SimpleSpinner from "../messages/Spinner";
import SimpleError from "../messages/Error";

/**
 * Выводит селект бокс
 * @param {*} object.title - заголовок сверху от селекта
 * @param {*} object.name - имя, которое используется при сабмите
 * @param {*} object.rules - список правил при заполнении. Обязательно передать массив. Если правил нет - пустой массив
 * @param {*} object.options - варианты для выбора
 * @param {*} object.isLoading - отображать спинер загрузки?
 * @param {*} object.isError - отображать стандартную ошибку?
 * @param {*} object.isModeMultiple - есть возможность множественного выбора?
 * @param {*} object.disabled - отключает форму, может служить только для отображения
 * @param {*} object.onChange - событие, которое происходит при выборе элемента
 * @param {*} object.defaultValue - изначальная опция для отображения
 * @param {*} object.isShowRewrite - показать что элемент перерисовывается
 * @returns
 */
export default function SelectInputFormItem({
  title = "Поле ввода",
  name = "formItemName",
  rules = {},
  options = {},
  isLoading = false,
  isError = false,
  isModeMultiple = false,
  disabled,
  onChange,
  defaultValue,
  isShowRewrite,
  isSortAlphabet = true,
}) {
  if (isShowRewrite) console.log(`Селект ${title} перерисовался`);
  // Предобработка данных для отображения в селекте
  let formatOptions = [];
  if (!isError && !isLoading && options) {
    formatOptions = options.map((el) => ({ label: el.name, value: el.id }));
  }

  const mode = isModeMultiple ? { mode: "multiple" } : {};
  const filterSort = isSortAlphabet
    ? (optionA, optionB) =>
        (optionA?.label ?? "")
          .toLowerCase()
          .localeCompare((optionB?.label ?? "").toLowerCase())
    : () => {};
  let result = "";
  if (isError) {
    result = <SimpleError />;
  } else if (isLoading) {
    result = <SimpleSpinner />;
  } else {
    result = (
      <Select
        {...mode}
        options={formatOptions}
        placeholder={title}
        disabled={disabled}
        defaultValue={defaultValue}
        onChange={onChange}
        filterSort={filterSort}
      />
    );
  }

  return (
    <Form.Item label={title} name={name} rules={rules} labelCol={{ span: 24 }}>
      {result}
    </Form.Item>
  );
}
