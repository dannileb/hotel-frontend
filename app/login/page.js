"use client";
import { Button, Form, Input, message } from "antd";
import { User } from "../utils/data-utils";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { userStore } from "../stores/userStore";

export default function LoginPage() {
  const { login } = userStore();
  const router = useRouter();
  const [form] = Form.useForm();
  const handleSubmit = (values) => {
    User.authorize(values)
      .then((user) => {
        message.success("Успешная авторизация!");
        login(user, user.jwt);
        router.push("/");
      })
      .catch((error) => {
        message.error("Неправильный логин или пароль");
      });
  };
  return (
    <>
      <Form
        form={form}
        name="normal_login"
        className="login-form max-w-xl mx-auto"
        initialValues={{
          remember: true,
        }}
        onFinish={handleSubmit}
      >
        <h1 className="text-3xl font-bold text-center mb-8">Авторизация</h1>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Введите электронную почту!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="E-mail"
            type="email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Введите пароль!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Пароль"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Войти
          </Button>
          <span className="ml-2">
            или <Link href="/register">зарегистрироваться</Link>
          </span>
        </Form.Item>
      </Form>
      <div className="mt-8 flex justify-center">
        <img src="./palm-tree2.png" alt="palm tree" className="max-w-64" />
        <img src="./palm-tree.png" alt="palm tree" className="max-w-64" />
      </div>
    </>
  );
}
