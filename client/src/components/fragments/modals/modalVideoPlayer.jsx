import { Modal } from "antd";
import { Player } from "video-react";
import { useRef, useEffect } from "react";

import "video-react/dist/video-react.css";

/**
 * Модальная форма для воспроизведения видео. Видео для возпроизведения передается через provide в current
 * @param {*} props.videoPlayer открыто ли модальное окно
 * @param {*} props.setVideoPlayer открыть модальное окно
 * @returns
 */
export default function ModalVideoPlayer(props) {
  const { videoPlayer, setVideoPlayer } = props;
  const player = useRef(null);

  const hideModal = () =>
    setVideoPlayer({
      visible: false,
      src: "FAQ/videos/default.mp4",
    });
  const pause = () => {
    player.current.pause();
  };
  useEffect(() => {
    player.current?.load();
  }, [videoPlayer]);

  return (
    <Modal
      open={videoPlayer.visible}
      footer={null}
      onCancel={hideModal}
      afterClose={pause}
      bodyStyle={{ padding: 0 }}
    >
      <Player autoPlay ref={player}>
        <source src={videoPlayer.src} type="video/mp4" />
      </Player>
    </Modal>
  );
}
