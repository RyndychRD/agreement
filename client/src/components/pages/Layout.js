import { Layout as ALayout } from "antd";
import Header from "./Header";
import MainPage from "./mainPage/MainPage";

import { Routes, Route } from "react-router-dom";
import { DocumentControl } from "./documentControl/DocumentControl";

function Layout() {
	return (
		<ALayout className="layout">
			<Header />
			<Routes>
				<Route exact path="/" element={<MainPage />} />
				<Route path="/document-control/*" element={<DocumentControl />} />
			</Routes>
		</ALayout>
	);
}

export default Layout;
