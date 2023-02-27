import { Layout } from "antd";
import { useGetFAQsQueryHook } from "../../../core/redux/api/Globals/FAQ/FAQApi";
import SimpleError from "../../fragments/messages/Error";
import SimpleSpinner from "../../fragments/messages/Spinner";

export default function FAQ() {
  const { Content } = Layout;

  const { data = [], isLoading, isError } = useGetFAQsQueryHook();
  if (isLoading) return <SimpleSpinner />;
  if (isError) return <SimpleError />;
  return (
    <Layout>
      <Content className="content">
        <ul className="category-list">
          {data.map((faq) => (
            <li>
              <a href={faq.url} target="_blank" rel="noreferrer">
                {faq.name}
              </a>
            </li>
          ))}
        </ul>
      </Content>
    </Layout>
  );
}
