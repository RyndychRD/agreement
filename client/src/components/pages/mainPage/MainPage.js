import {
	ACol,
	AButton,
	ATooltip,
	ADesktopOutlined,
	ARow,
	ASpan,
} from "./../../adapter";
import "./style.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Layout } from "antd";

function MainPage() {
	const isAuth = useSelector((state) => state.session.isAuth);
	const { Content } = Layout;
	const navigate = useNavigate();
	useEffect(() => {
		if (!isAuth) navigate("/login");
	}, [isAuth, navigate]);

	const documentControlP = (
		<ACol className="main-menu-col">
			<ATooltip placement="rightTop" title="Документооборот">
				<NavLink
					to="/document-control/created-documents"
					style={{ fontSize: "25px" }}
				>
					<AButton type="solid" className="main-menu-button">
						<ADesktopOutlined style={{ paddingRight: 7 }} />
						<ASpan>Договоры </ASpan>
					</AButton>
				</NavLink>
			</ATooltip>
		</ACol>
	);

	return (
		<Content className="content">
			<ARow className="main-button-row">{true ? documentControlP : ""}</ARow>
		</Content>
	);
}

export default MainPage;
