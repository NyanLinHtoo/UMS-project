import { Button, Checkbox, Form, Input, Typography } from "antd";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const { Title, Text, Link } = Typography;

  const onFinish = (values: unknown) => {
    login(values).then(() => {
      navigate("/dashboard");
    });
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 24 }}
      className="max-w-sm mx-auto my-48 p-8 rounded-tl-3xl rounded-br-3xl border-2 drop-shadow-lg shadow-black"
      // initialValues={{ remember: true }}
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      autoComplete="off">
      <Title level={3} className="text-purple-800 mb-6 text-center text-2xl">
        Welcome Back!
      </Title>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}>
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked">
        <div className="flex justify-between items-center">
          <Checkbox>Remember me</Checkbox>
          <Link href="#" className="text-right">
            Forgot Password
          </Link>
        </div>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="text-white  focus:outline-none focus:ring-4  font-medium rounded-xl w-full text-sm px-5 py-2.5 text-center mb-2">
          Login
        </Button>
      </Form.Item>
      <Form.Item>
        <Text className="text-sm font text-black pt-3">
          Don’t have an account yet?{" "}
          <Link
            href="/register"
            className="font-medium text-purple-500 hover:underline">
            Register
          </Link>
        </Text>
      </Form.Item>
    </Form>
  );
};

export default Login;
