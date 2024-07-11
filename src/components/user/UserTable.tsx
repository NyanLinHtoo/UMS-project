import { Space, Table, TableProps, Tag } from "antd";
import { useState } from "react";
import UserDrawer from "./components/UserDrawer";

interface DataType {
  key: string;
  name: string;
  email: string;
  phone: number;
  gender: string;
  roles: string[];
}

const UserTable = () => {
  const [open, setOpen] = useState(true);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    // setUpdate(null); // Reset update state
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Roles",
      key: "roles",
      dataIndex: "roles",
      render: (_, { roles }) => (
        <>
          {roles.map((role) => {
            let color = role.length > 5 ? "geekblue" : "green";
            if (role === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={role}>
                {role.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button onClick={showDrawer}>Invite {record.name}</button>
          <button>Delete</button>
        </Space>
      ),
    },
  ];

  const dataSource: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      email: "test@gmail.com",
      phone: 32,
      gender: "male",
      roles: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      email: "test@gmail.com",
      phone: 32,
      gender: "male",
      roles: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      email: "test@gmail.com",
      phone: 32,
      gender: "male",
      roles: ["cool", "teacher"],
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={dataSource} />
      <UserDrawer onClose={onClose} open={open} />
    </>
  );
};

export default UserTable;
