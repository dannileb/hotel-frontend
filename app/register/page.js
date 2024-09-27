"use client";
import { Button, Form, Input, message } from "antd";
import { User } from "../utils/data-utils";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form] = Form.useForm();
  const handleSubmit = (values) => {
    delete values.confirmPassword;

    User.register(values)
      .then(() => {
        message.success("Успешная регистрация!");
        router.push("/login");
      })
      .catch((error) => {
        message.error("Ошибка регистрации, попробуйте позже");
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
        <h1 className="text-3xl font-bold text-center mb-8">Регистрация</h1>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Введите имя!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Имя"
          />
        </Form.Item>
        <Form.Item
          name="surname"
          rules={[
            {
              required: true,
              message: "Введите фамилию!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Фамилия"
          />
        </Form.Item>
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
        <Form.Item
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Введите пароль!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Пароли не совпадают!"));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Повторите пароль"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Зарегистрироваться
          </Button>
          <span className="ml-2">
            или <Link href="/login">авторизоваться</Link>
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
