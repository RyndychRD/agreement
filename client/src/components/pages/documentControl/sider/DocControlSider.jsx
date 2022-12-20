/** @format */

import Layout from 'antd/es/layout/layout'
import { NavLink } from 'react-router-dom'
import { AMenu } from '../../../adapter'

export default function Sider() {
	const { Sider: LayoutSider } = Layout

	function getItem(label, key, icon, children, type) {
		return {
			key,
			icon,
			children,
			label,
			type,
		}
	}

	function getLink(LinkKey) {
		const dict = {
			'created-doc': getItem(
				<NavLink to='/document-control/created-documents'>
					Созданные мною
				</NavLink>,
				'created-documents'
			),
		}
		return dict[LinkKey] ? dict[LinkKey] : null
	}

	const items = [
		getItem('Мои документы', 'MyDocuments', null, [
			// Не делай так больше
			// https://eslint.org/docs/latest/rules/no-constant-condition
			// eslint-disable-next-line no-constant-condition
			true ? getLink('created-doc') : null,
			// Не делай так больше
			// https://eslint.org/docs/latest/rules/no-constant-condition
			// eslint-disable-next-line no-constant-condition
			false ? getItem('На доработку', 'FILL_ME') : null,
			// Не делай так больше
			// https://eslint.org/docs/latest/rules/no-constant-condition
			// eslint-disable-next-line no-constant-condition
			false ? getItem('Согласованные', 'FILL_ME') : null,
			// Не делай так больше
			// https://eslint.org/docs/latest/rules/no-constant-condition
			// eslint-disable-next-line no-constant-condition
			false ? getItem('Исполненные', 'FILL_ME') : null,
			// Не делай так больше
			// https://eslint.org/docs/latest/rules/no-constant-condition
			// eslint-disable-next-line no-constant-condition
			false ? getItem('Отклоненные', 'FILL_ME') : null,
			// Не делай так больше
			// https://eslint.org/docs/latest/rules/no-constant-condition
			// eslint-disable-next-line no-constant-condition
			false ? getItem('Регистрация документов', 'FILL_ME') : null,
		]),
		getItem('Подписание', 'Signing', null, [
			// Не делай так больше
			// https://eslint.org/docs/latest/rules/no-constant-condition
			// eslint-disable-next-line no-constant-condition
			false ? getItem('Входящие', 'FILL_ME') : null,
			// Не делай так больше
			// https://eslint.org/docs/latest/rules/no-constant-condition
			// eslint-disable-next-line no-constant-condition
			false ? getItem('Подписанные мною', 'FILL_ME') : null,
			// Не делай так больше
			// https://eslint.org/docs/latest/rules/no-constant-condition
			// eslint-disable-next-line no-constant-condition
			false ? getItem('Документы подписанные в ООПЗ', 'FILL_ME7') : null,
		]),
		getItem('Задачи', 'Tasks', null, [
			// Не делай так больше
			// https://eslint.org/docs/latest/rules/no-constant-condition
			// eslint-disable-next-line no-constant-condition
			false ? getItem('Входящие', 'FILL_ME') : null,
		]),
		getItem('Список (Админ)', 'AdminDocs', null, [
			// Не делай так больше
			// https://eslint.org/docs/latest/rules/no-constant-condition
			// eslint-disable-next-line no-constant-condition
			false ? getItem('Все документы', 'FILL_ME') : null,
		]),
	]
	return (
		<LayoutSider theme='dark' collapsible>
			<AMenu
				defaultSelectedKeys={window.location.pathname}
				className='siderMenu'
				mode='inline'
				defaultOpenKeys={['MyDocuments']}
				items={items}
			/>
		</LayoutSider>
	)
}