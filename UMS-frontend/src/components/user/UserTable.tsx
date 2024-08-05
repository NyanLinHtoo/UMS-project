import { Button, Input, Modal, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { useEffect, useState, useCallback } from "react";
import UserDrawer from "./components/UserDrawer";
import { userServices } from "../../services/apiServices";

export interface DataType {
  key: string;
  _id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  roles: string;
}

const UserTable = () => {
  const [open, setOpen] = useState(false);
  const [currentRecords, setCurrentRecords] = useState<DataType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState<DataType[]>([]);

  const fetchAndUpdateData = useCallback(async () => {
    try {
      const result = await userServices.getAll();
      const dataWithKeys = result.data.map((item: DataType, index: number) => ({
        ...item,
        key: (index + 1).toString(),
      }));
      setDataSource(dataWithKeys);
    } catch (err) {
      console.log("ERROR ===> ", err);
    }
  }, []);

  useEffect(() => {
    fetchAndUpdateData();
  }, [fetchAndUpdateData]);

  const { confirm } = Modal;

  const showDeleteConfirm = useCallback(
    (record: DataType) => {
      const modal = confirm({
        title: `Are you sure you want to delete ${record.name}?`,
        icon: <ExclamationCircleFilled />,
        content: "This action cannot be undone.",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        centered: true,
        okButtonProps: { loading: false },
        onOk: async () => {
          modal.update({ okButtonProps: { loading: true } });
          try {
            await userServices.deleteUser(record._id);
            setDataSource((prevData) =>
              prevData.filter((item) => {
                console.log("item===>", item);
                console.log("Record===>", record);

                return item._id !== record._id;
              })
            );
            modal.update({ okButtonProps: { loading: false } });
          } catch (err) {
            console.error("Error in Delete: ", err);
            modal.update({ okButtonProps: { loading: false } });
          }
        },
      });
    },
    [confirm]
  );

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handleCreate = () => {
    console.log("Create");
    setCurrentRecords(null);
    setOpen(true);
  };

  const handleEdit = (record: DataType) => {
    console.log("Edit", record);
    setCurrentRecords(record);
    setOpen(true);
  };

  const refreshTable = useCallback(() => {
    fetchAndUpdateData();
    setOpen(false);
  }, [fetchAndUpdateData]);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Id",
      dataIndex: "key",
      key: "key",
      sorter: (a, b) => a.name.length - b.name.length,
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Roles",
      key: "roles",
      dataIndex: "role",
      sorter: (a, b) => a.roles.length - b.roles.length,
      render: (role) => {
        let color;
        role === "admin" ? (color = "red") : (color = "green");
        return (
          <Tag color={color} key={role}>
            {role.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      sorter: (a, b) => a.gender.length - b.gender.length,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => showDeleteConfirm(record)}
            danger
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search by name"
          onChange={handleSearch}
          className="w-64 md:w-80"
        />
        <Button type="primary" onClick={handleCreate}>
          Create Users
        </Button>
      </div>
      <Table columns={columns} dataSource={dataSource} />
      <UserDrawer
        onClose={onClose}
        open={open}
        records={currentRecords}
        refreshTable={refreshTable}
      />
      <Modal
        title="Deleting User"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <p>Are you sure to delete this user?</p>
      </Modal>
    </div>
  );
};

export default UserTable;
