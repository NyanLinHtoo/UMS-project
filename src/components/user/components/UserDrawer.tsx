import { Button, Drawer, Space } from "antd";
import UserForm from "./UserForm";

interface Props {
  onClose: () => void;
  open: boolean;
}

const UserDrawer = ({ onClose, open }: Props) => {
  return (
    <>
      <Drawer
        title="Create a new account"
        width={540}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} type="primary">
              Submit
            </Button>
          </Space>
        }>
        <UserForm onClose={onClose} />
      </Drawer>
    </>
  );
};

export default UserDrawer;
