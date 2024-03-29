import { Form, Select } from "antd";
import SimpleSpinner from "../messages/Spinner";
import SimpleError from "../messages/Error";

/**
 * Выводит селект бокс
 * @param {*} props.title - заголовок сверху от селекта
 * @param {*} props.name - имя, которое используется при сабмите
 * @param {*} props.rules - список правил при заполнении. Обязательно передать массив. Если правил нет - пустой массив
 * @param {*} props.options - варианты для выбора
 * @param {*} props.isLoading - отображать спинер загрузки?
 * @param {*} props.isError - отображать стандартную ошибку?
 * @param {*} props.isModeMultiple - есть возможность множественного выбора?
 * @param {*} props.disabled - отключает форму, может служить только для отображения
 * @param {*} props.onChange - событие, которое происходит при выборе элемента
 * @param {*} props.defaultValue - изначальная опция для отображения
 * @param {*} props.isShowRewrite - показать что элемент перерисовывается
 * @returns
 */
export default function SelectInputFormItem(props) {
  const {
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
    isShowSearch = false,
  } = props;
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
        showSearch={isShowSearch}
        options={formatOptions}
        placeholder={title}
        disabled={disabled}
        defaultValue={defaultValue}
        onChange={onChange}
        filterSort={filterSort}
        filterOption={(input, option) =>
          (option?.label.toLowerCase() ?? "").includes(input.toLowerCase())
        }
      />
    );
  }

  return (
    <Form.Item label={title} name={name} rules={rules} labelCol={{ span: 24 }}>
      {result}
    </Form.Item>
  );
}
