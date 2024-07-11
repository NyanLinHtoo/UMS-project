import {
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
} from "antd";

interface Props {
  onClose: () => void;
}

const UserForm = ({ onClose }: Props) => {
  const [form] = Form.useForm();

  const { Option } = Select;

  return (
    <Form layout="vertical" form={form}>
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
          <Option value="demo">Admin</Option>
          <Option value="demo">User</Option>
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
    </Form>
  );
};

export default UserForm;
