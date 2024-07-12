import { Button, Form, Input, InputNumber, Radio, Select, Space } from "antd";

interface Props {
  onClose: () => void;
}

const UserForm = ({ onClose }: Props) => {
  const [form] = Form.useForm();

  const { Option } = Select;

  const onFinish = () => {
    console.log("form", form.getFieldsValue());

    onClose();
  };

  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Please enter your name." }]}>
        <Input placeholder="Please enter your name" />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: "Please enter your email." }]}>
        <Input placeholder="Please enter your email" />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Phone"
        rules={[
          { required: true, message: "Please enter your phone number." },
        ]}>
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="roles"
        label="Roles"
        rules={[{ required: true, message: "Please select your role" }]}>
        <Select>
          <Option value="admin">Admin</Option>
          <Option value="user">User</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="gender"
        label="Gender"
        rules={[{ required: true, message: "Please select your gender." }]}>
        <Radio.Group>
          <Radio value="male"> Male </Radio>
          <Radio value="female"> Female </Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item>
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
