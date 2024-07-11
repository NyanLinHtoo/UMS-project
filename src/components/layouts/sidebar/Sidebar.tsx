import { Layout, Menu, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;
const { Title } = Typography;

export interface collapseProp {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

const AppSidebar = ({ collapsed }: collapseProp) => {
  const navigate = useNavigate();

  const handleItemClick = (key: string) => {
    navigate(key);
  };

  const navItems = [
    {
      key: "users",
      icon: <UserOutlined />,
      label: "User",
    },
  ];

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}>
      <Title
        level={4}
        style={{
          color: "#fff",
          marginLeft: "30px",
          marginTop: "15px",
          marginBottom: "15px",
        }}>
        USM System
      </Title>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        onClick={({ key }) => handleItemClick(key)}
        items={navItems}
      />
    </Sider>
  );
};

export default AppSidebar;
