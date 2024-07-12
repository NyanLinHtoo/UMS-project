import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

const AppContent = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Content
      style={{
        margin: "24px 16px",
        padding: 24,
        minHeight: 280,
        height: 2000,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}>
      <Outlet />
    </Content>
  );
};

export default AppContent;
