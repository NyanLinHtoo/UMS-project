import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Radio,
  Select,
  Space,
} from "antd";
import { RuleObject } from "antd/lib/form";
import { StoreValue } from "rc-field-form/lib/interface";
import { useEffect } from "react";
import { DataType } from "../UserTable";
import { userServices } from "../../../services/apiServices";

interface Props {
  onClose: () => void;
  initialValues: DataType | null;
  refreshTable: () => void;
}

const UserForm = ({ onClose, initialValues, refreshTable }: Props) => {
  const [form] = Form.useForm();

  const { Option } = Select;

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const onFinish = async () => {
    try {
      const values = form.getFieldsValue();
      if (!initialValues?._id) {
        await userServices.createUser(values);
      } else {
        await userServices.updateUser(initialValues._id, values);
      }
      refreshTable();
      onClose();
    } catch (error) {
      console.log("Err onFinish => ", error);
    }
  };

  const validatePhoneNumber = (_: RuleObject, value: StoreValue) => {
    const phoneRegex = /^09\d{7,10}$/;
    if (!value) {
      return Promise.reject(new Error("Please enter your phone number."));
    }
    if (!phoneRegex.test(value)) {
      return Promise.reject(
        new Error("Please enter a valid Myanmar phone number (09xxxxxxxxx).")
      );
    }
    return Promise.resolve();
  };

  return (
    <ConfigProvider
      form={{
        requiredMark: (label) => (
          <>
            {label}
            <span style={{ color: "#ff4d4f", marginLeft: 4 }}>*</span>
          </>
        ),
      }}>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        className="custom-form">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter your name." }]}>
          <Input placeholder="Please enter your name" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter your email." },
            { type: "email", message: "Please enter a valid email address." },
          ]}>
          <Input placeholder="Please enter your email" />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[{ validator: validatePhoneNumber }]}>
          <Input
            className="w-full"
            placeholder="Please enter your phone number"
          />
        </Form.Item>
        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: "Please select your role" }]}>
          <Select>
            <Option value="agent">Agent</Option>
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
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};

export default UserForm;
