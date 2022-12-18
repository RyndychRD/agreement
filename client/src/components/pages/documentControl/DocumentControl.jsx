import { Route, Routes } from "react-router-dom";
import { CreatedDocument } from "./createdDocuments/CreatedDocuments";
import { Layout } from "antd";
import { Sider } from "./sider/Sider";
import React from "react";

export function DocumentControl() {
	const { Content } = Layout;
	return (
		<Layout>
			<Sider />
			<Content className="content">
				<Routes>
					<Route path="/created-documents" element={<CreatedDocument />} />
				</Routes>
			</Content>
		</Layout>
	);
}
