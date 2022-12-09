import { Layout as ALayout } from "antd";
import {
	AMenu,
	ARow,
	ACol,
	ASpan,
	AArrowLeftOutlined,
	APageHeader,
} from "../adapter";

function Header() {
	const { Header } = ALayout;

	const onClick = (e) => {
		console.log("Кликнул по ", e.key);
	};

	const menuItems = [
		{
			label: "Пользователь",
			key: "user",
			children: [
				{
					label: "Админка",
					key: "admin_settings",
				},
				{
					label: "Справка",
					key: "FAQ",
				},
				{
					label: "Справка (Админ)",
					key: "FAQ_admin",
				},
				{
					label: "Аккаунт",
					key: "account",
				},
				{
					label: "Выйти",
					key: "logout",
				},
			],
		},
	];

	//Заменить на стор из редаксу
	function isShowIcon() {
		return window.location.pathname !== "/" ? (
			<AArrowLeftOutlined style={{ color: "white" }} />
		) : (
			""
		);
	}

	return (
		<Header>
			<ARow justify="space-between" align="middle">
				<ACol>
					<APageHeader
						onBack={() => {
							window.location.href = "/";
						}}
						backIcon={isShowIcon()}
						title={
							<ASpan style={{ color: "white" }}>Согласование договоров</ASpan>
						}
					/>
				</ACol>
				<ACol style={{ width: "125px" }}>
					<AMenu
						onClick={onClick}
						theme="dark"
						mode="horizontal"
						items={menuItems}
					/>
				</ACol>
			</ARow>
		</Header>
	);
}

export default Header;
