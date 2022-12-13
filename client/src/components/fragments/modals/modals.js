import { AModal } from "../../adapter";

export const ModalInput = (props) => {
	return (
		<AModal okText="Сохранить" cancelText="Отмена" {...props}>
			{props.children}
		</AModal>
	);
};
export function ModalUpdate(props) {
	return (
		<AModal okText="Редактировать" cancelText="Отмена" {...props}>
			{props.children}
		</AModal>
	);
}
export function ModalDelete(props) {
	return (
		<AModal okText="Удалить" cancelText="Отмена" {...props}>
			Вы уверены что хотите удалить элемент?
		</AModal>
	);
}
