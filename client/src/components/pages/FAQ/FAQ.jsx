import { Layout } from "antd";

export default function FAQ() {
  const { Content } = Layout;

  return (
    <Layout>
      <Content className="content">
        <ul className="category-list">
          <li>
            <a href="/FAQ/Creation.pdf" target="_blank" rel="noreferrer">
              Как создать документ
            </a>
          </li>
          <li>
            <a href="/FAQ/Signing.pdf" target="_blank" rel="noreferrer">
              Как подписать документ
            </a>
          </li>
          <li>
            <a href="/FAQ/TaskComplete.pdf" target="_blank" rel="noreferrer">
              Как выполнить поручение
            </a>
          </li>
        </ul>
      </Content>
    </Layout>
  );
}
