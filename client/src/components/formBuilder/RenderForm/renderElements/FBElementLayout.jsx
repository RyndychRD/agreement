import { Col, Row } from "antd";

export default function FBElementLayout({ name, children }) {
  return (
    <Row>
      <Col span={8}>
        <h3>{name}</h3>
      </Col>
      <Col span={16}>
        <div
          style={{
            width: "100%",
          }}
        >
          {children}
        </div>
      </Col>
    </Row>
  );
}
