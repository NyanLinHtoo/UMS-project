import { useState } from "react";
import { Layout } from "antd";
import AppHeader from "./header/Header";
import AppContent from "./content/Content";
import AppSidebar from "./sidebar/Sidebar";

const AppLayoutPage = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 200,
          transition: "margin-left 0.2s",
        }}>
        <AppHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <AppContent />
      </Layout>
    </Layout>
  );
};

export default AppLayoutPage;
