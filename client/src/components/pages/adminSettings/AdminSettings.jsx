import { Layout } from "antd";
import { Sider } from "./sider/Sider";
import { Route, Routes } from "react-router-dom";
import Catalogs from "./catalogs/Catalogs";
import React from "react";

export function AdminSettings() {
	const { Content } = Layout;
	return (
		<Layout>
			<Sider />
			<Content className="content">
				<Routes>
					<Route path="/catalogs/*" element={<Catalogs />} />
				</Routes>
			</Content>
		</Layout>
	);
}
