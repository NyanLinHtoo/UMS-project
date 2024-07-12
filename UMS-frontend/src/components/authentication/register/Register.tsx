import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Typography,
} from "antd";

const Register = () => {
  const [registerForm] = Form.useForm();
  const { Title, Text, Link } = Typography;

  const onFinish = () => {
    console.log(registerForm.getFieldsValue());
  };

  return (
    <Form
      layout="vertical"
      form={registerForm}
      onFinish={onFinish}
      className="max-w-sm mx-auto my-48 p-8 rounded-tl-3xl rounded-br-3xl border-2 drop-shadow-lg shadow-black">
      <Title level={3} className="text-purple-800 mb-6 text-center text-2xl">
        Register
      </Title>
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
      <Row>
        <Col span={12}>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              { required: true, message: "Please enter your phone number." },
            ]}>
            <InputNumber style={{ width: "80%" }} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please select your gender." }]}>
            <Radio.Group>
              <Radio value="male"> Male </Radio>
              <Radio value="female"> Female </Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button
          htmlType="submit"
          type="primary"
          className="text-white  focus:outline-none focus:ring-4  font-medium rounded-xl w-full text-sm px-5 py-2.5 text-center mb-2">
          Register
        </Button>
      </Form.Item>
      <Form.Item>
        <Text className="text-sm font text-black pt-3">
          Don’t have an account yet?{" "}
          <Link
            href="/login"
            className="font-medium text-purple-500 hover:underline">
            Login
          </Link>
        </Text>
      </Form.Item>
    </Form>
  );
};

export default Register;
