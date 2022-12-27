import { Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import CreatedDocument from "./createdDocuments/CreatedDocuments";
import Sider from "./sider/DocControlSider";
import "../../../css/index.css";

export default function DocumentControl() {
	const { Content } = Layout;
	return (
		<Layout>
			<Sider />
			<Content className="content">
				<Routes>
					<Route path="/created-documents/*" element={<CreatedDocument />} />
				</Routes>
			</Content>
		</Layout>
	);
}
