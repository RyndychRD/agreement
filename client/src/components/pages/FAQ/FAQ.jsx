import { Button, Col, Layout, Modal, Row } from "antd";
import { Player } from "video-react";
import { useState, useRef, useEffect } from "react";

import "video-react/dist/video-react.css";

export default function FAQ() {
  const { Content } = Layout;
  const [state, setState] = useState({
    visible: false,
    src: "videos/default.mp4",
  });

  const player = useRef(null);

  const hideModal = () => {
    setState({
      src: "videos/default.mp4",
      visible: false,
    });
  };
  const pause = () => {
    player.current.pause();
  };
  useEffect(() => {
    player.current?.load();
  }, [state]);

  return (
    <Layout>
      <Content className="content">
        <Row justify="space-between">
          <Col span={6} offset={2}>
            <Button
              type="primary"
              onClick={() => {
                setState({ visible: true, src: "videos/default.mp4" });
              }}
            >
              Как создать документ
            </Button>
          </Col>
          <Col span={6}>
            <Button
              type="primary"
              onClick={() => {
                setState({ visible: true, src: "videos/video_1.mp4" });
              }}
            >
              Как подписать документ
            </Button>
          </Col>
          <Col span={6}>
            <Button type="primary">Как исполнить поручение</Button>
          </Col>
        </Row>
        <Modal
          open={state.visible}
          footer={null}
          onCancel={hideModal}
          afterClose={pause}
          bodyStyle={{ padding: 0 }}
        >
          <Player autoPlay ref={player}>
            <source src={state.src} type="video/mp4" />
          </Player>
        </Modal>
      </Content>
    </Layout>
  );
}
