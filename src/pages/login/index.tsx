import { useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';

import LoginType from '../../types/login';
import useAuth from '../../store/auth';

const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { login } = useAuth();

  return (
    <Form
      form={form}
      name="login"
      labelCol={{
        span: 24,
      }}
      wrapperCol={{
        span: 24,
      }}
      style={{ maxWidth: 600 }}
      onFinish={() => login(form, navigate)}
      autoComplete="off"
    >
      <Form.Item<LoginType>
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<LoginType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>)
};

export default LoginPage;