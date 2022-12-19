import { AModal } from '../../adapter'

export function ModalInput(props) {
	const { children } = props
	return (
		// FIXME: Проверь destroyOnClose default value
		<AModal okText="Сохранить" cancelText="Отмена" destroyOnClose {...props}>
			{children}
		</AModal>
	)
}
export function ModalUpdate(props) {
	const { children } = props
	return (
		<AModal okText="Редактировать" cancelText="Отмена" {...props}>
			{children}
		</AModal>
	)
}
export function ModalDelete(props) {
	return (
		<AModal okText="Удалить" cancelText="Отмена" {...props}>
			Вы уверены что хотите удалить элемент?
		</AModal>
	)
}
