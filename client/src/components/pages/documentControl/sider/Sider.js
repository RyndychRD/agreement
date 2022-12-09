import Layout from "antd/es/layout/layout";
import { AMenu } from "./../../../adapter";
import { NavLink } from "react-router-dom";

export function Sider() {
	const { Sider } = Layout;

	function getItem(label, key, icon, children, type) {
		return {
			key,
			icon,
			children,
			label,
			type,
		};
	}

	function getLink(link_key) {
		const dict = {
			"created-doc": getItem(
				<NavLink to="/document-control/created-documents">
					Созданные мною
				</NavLink>,
				"created-documents"
			),
		};
		return dict[link_key] ? dict[link_key] : null;
	}

	const items = [
		getItem("Мои документы", "MyDocuments", null, [
			true ? getLink("created-doc") : null,
			false ? getItem("На доработку", "FILL_ME") : null,
			false ? getItem("Согласованные", "FILL_ME") : null,
			false ? getItem("Исполненные", "FILL_ME") : null,
			false ? getItem("Отклоненные", "FILL_ME") : null,
			false ? getItem("Регистрация документов", "FILL_ME") : null,
		]),
		getItem("Подписание", "Signing", null, [
			false ? getItem("Входящие", "FILL_ME") : null,
			false ? getItem("Подписанные мною", "FILL_ME") : null,
			false ? getItem("Документы подписанные в ООПЗ", "FILL_ME7") : null,
		]),
		getItem("Задачи", "Tasks", null, [
			false ? getItem("Входящие", "FILL_ME") : null,
		]),
		getItem("Список (Админ)", "AdminDocs", null, [
			false ? getItem("Все документы", "FILL_ME") : null,
		]),
	];
	return (
		<Sider theme="dark" collapsible>
			<AMenu
				defaultSelectedKeys={window.location.pathname}
				className="siderMenu"
				mode="inline"
				defaultOpenKeys={["MyDocuments"]}
				items={items}
			></AMenu>
		</Sider>
	);
}
