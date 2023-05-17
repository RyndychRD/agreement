import {
  DownOutlined,
  MinusCircleOutlined,
  UpOutlined,
} from "@ant-design/icons";
import color from "../../FormBuilderColorRow";
import ModalConfirm from "../../../fragments/modals/ModalConfirm";

/**
 * Логика кнопок, которые отображаются в каждой карточке. Обычно передаются стандартные функции из Form.List
 * @param {*} remove Логика удаления элемента
 * @param {*} move Логика сдвига относительно других элементов
 * @param {*} name Имя в Form.List
 * @param {*} fields Список всех полей. Служит для правильного отображения кнопок передвижения относительно других элементов
 * @param {*} key Ключ для однозначного распознания Reactом
 */
export default function ButtonOnCarts(remove, move, name, fields, key) {
  return (
    <div className="flexibleCart">
      <button
        className="button-style"
        type="button"
        title="Удалить"
        onClick={() =>
          ModalConfirm({
            content: "Вы точно хотите удалить элемент?",
            onOk: () => {
              remove(name);
            },
            okText: "Да",
            cancelText: "Нет",
          })
        }
      >
        <MinusCircleOutlined />
      </button>
      {name >= 1 && (
        <button
          className="button-style"
          title="Выше"
          type="button"
          onClick={() => remove(move(name, name - 1))}
        >
          <UpOutlined />
        </button>
      )}
      {name < fields.length - 1 && (
        <button
          className="button-style"
          type="button"
          title="Ниже"
          onClick={() => remove(move(name, name + 1))}
        >
          <DownOutlined />
        </button>
      )}
      <div
        className="square"
        style={{
          backgroundColor: `${color[key]}`,
          border: `5px ridge ${color[key]}`,
        }}
      />
    </div>
  );
}
