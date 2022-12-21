/** @format */

import { Layout } from "antd";
import { NavLink } from "react-router-dom";
import {
  AButton,
  ACol,
  ADesktopOutlined,
  ARow,
  ASpan,
  ATooltip,
} from "../../adapter";
import "./style.css";

function DocumentControlP() {
  return (
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
}

function MainPage() {
  const { Content } = Layout;

  return (
    <Content className="content">
      <ARow className="main-button-row">
        <DocumentControlP />
      </ARow>
    </Content>
  );
}

export default MainPage;
