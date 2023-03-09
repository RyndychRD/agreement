/** @format */

import { Layout, Tooltip, Col, Button, Row } from "antd";
import { DesktopOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import {
  isAccessGranted,
  isAnyAccessGranted,
} from "../../../services/userAccessService";

import "./style.css";
import { Error403 } from "../../fragments/messages/Error";

function DocumentControlP() {
  return (
    <>
      {isAccessGranted("ContractAgreement") ? (
        <Col className="main-menu-col">
          <Tooltip placement="rightTop" title="Документооборот">
            <NavLink
              to="/document-control/user-documents/created-documents"
              style={{ fontSize: "25px" }}
            >
              <Button type="solid" className="main-menu-button">
                <DesktopOutlined style={{ paddingRight: 7 }} />
                <span>Договоры </span>
              </Button>
            </NavLink>
          </Tooltip>
        </Col>
      ) : (
        ""
      )}
      {isAccessGranted("DocumentArchive") ? (
        <Col className="main-menu-col">
          <Tooltip placement="rightTop" title="Архив">
            <NavLink
              to="/archive/document-archive"
              style={{ fontSize: "25px" }}
            >
              <Button type="solid" className="main-menu-button">
                <DesktopOutlined style={{ paddingRight: 7 }} />
                <span>Архив </span>
              </Button>
            </NavLink>
          </Tooltip>
        </Col>
      ) : (
        ""
      )}
    </>
  );
}

function MainPage() {
  const { Content } = Layout;
  if (!isAnyAccessGranted(["ContractAgreement", "DocumentArchive"]))
    return <Error403 />;
  return (
    <Content className="content">
      <Row gutter={16} className="main-button-row">
        <DocumentControlP />
      </Row>
    </Content>
  );
}

export default MainPage;
