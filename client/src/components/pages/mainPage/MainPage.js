import {
	ACol,
	AButton,
	ATooltip,
	ADesktopOutlined,
	ARow,
	ASpan,
} from "./../../adapter";
import "./style.css";

import { NavLink } from "react-router-dom";
import { Layout } from "antd";

function MainPage() {
	const { Content } = Layout;

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
