import { Drawer } from "antd";
import UserForm from "./UserForm";
import { DataType } from "../UserTable";
import "./styles.css";

interface Props {
  onClose: () => void;
  open: boolean;
  records: DataType | null;
  refreshTable: () => void;
}

const UserDrawer = ({ onClose, open, records, refreshTable }: Props) => {
  return (
    <>
      <Drawer
        title={records ? "Update User" : "Create User"}
        width={540}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}>
        <UserForm
          onClose={onClose}
          initialValues={records}
          refreshTable={refreshTable}
        />
      </Drawer>
    </>
  );
};

export default UserDrawer;
