import {
  DownOutlined,
  MinusCircleOutlined,
  UpOutlined,
} from "@ant-design/icons";
import color from "../../FormBuilderColorRow";
import ModalConfirm from "../../../fragments/modals/ModalConfirm";

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
