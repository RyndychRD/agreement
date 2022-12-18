import Layout from "antd/es/layout/layout";
import { AMenu } from "../../../adapter";
import { NavLink } from "react-router-dom";
import React from "react";

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
			departments: getItem(
				<NavLink to="/admin-settings/catalogs/departments">
					Департаменты
				</NavLink>,
				"departments"
			),
			users: getItem(
				<NavLink to="/admin-settings/catalogs/users">Пользователи</NavLink>,
				"users"
			),
			positions: getItem(
				<NavLink to="/admin-settings/catalogs/positions">Должности</NavLink>,
				"positions"
			),
		};
		return dict[link_key] ? dict[link_key] : null;
	}

	const items = [
		getItem("Справочники", "MyCatalogs", null, [
			//Не делай так больше
			//https://eslint.org/docs/latest/rules/no-constant-condition
			// eslint-disable-next-line no-constant-condition
			true ? getLink("departments") : null,
			//Не делай так больше
			//https://eslint.org/docs/latest/rules/no-constant-condition
			// eslint-disable-next-line no-constant-condition
			false ? getLink("users") : null,
			//Не делай так больше
			//https://eslint.org/docs/latest/rules/no-constant-condition
			// eslint-disable-next-line no-constant-condition
			true ? getLink("positions") : null,
			//Не делай так больше
			//https://eslint.org/docs/latest/rules/no-constant-condition
			// eslint-disable-next-line no-constant-condition
			false ? getItem("Права", "FILL_ME") : null,
		]),
	];
	return (
		<Sider theme="dark" collapsible>
			<AMenu
				defaultSelectedKeys={window.location.pathname}
				className="siderMenu"
				mode="inline"
				defaultOpenKeys={["MyCatalogs"]}
				items={items}
			></AMenu>
		</Sider>
	);
}
