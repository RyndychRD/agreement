import { Layout } from "antd";
import { useState } from "react";
import { useGetFAQsQueryHook } from "../../../core/redux/api/Globals/FAQ/FAQApi";
import SimpleError from "../../fragments/messages/Error";
import SimpleSpinner from "../../fragments/messages/Spinner";
import ModalVideoPlayer from "../../fragments/modals/modalVideoPlayer";

// Для видео ссылка должна содержать в себе путь /videos/
export default function FAQ() {
  const { Content } = Layout;
  const [videoPlayer, setVideoPlayer] = useState({
    visible: false,
    src: "FAQ/videos/default.mp4",
  });
  const { data = [], isLoading, isError } = useGetFAQsQueryHook();
  if (isLoading) return <SimpleSpinner />;
  if (isError) return <SimpleError />;
  return (
    <Layout>
      <Content className="content">
        <ul className="category-list">
          {data.map((faq) => {
            let content = `Ошибка распознавания ${faq.url}`;
            if (faq.url.indexOf(".pdf") !== -1) {
              content = (
                <a href={faq.url} target="_blank" rel="noreferrer">
                  {faq.name}
                </a>
              );
            }
            if (faq.url.indexOf("/videos/") !== -1) {
              content = (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/anchor-is-valid, jsx-a11y/no-static-element-interactions
                <a
                  onClick={() => {
                    setVideoPlayer({ visible: true, src: faq.url });
                  }}
                >
                  {faq.name}
                </a>
              );
            }

            return <li key={faq.url}>{content}</li>;
          })}
        </ul>
        <ModalVideoPlayer
          videoPlayer={videoPlayer}
          setVideoPlayer={setVideoPlayer}
        />
      </Content>
    </Layout>
  );
}
