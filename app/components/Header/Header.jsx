"use client";
import { userStore } from "@/app/stores/userStore";
import { LoginOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header = () => {
  const { isAuth, logout, user } = userStore();
  const pathname = usePathname();
  return (
    <header className="p-4 bg-slate-50 border border-slate-200 border-solid">
      <div className="container px-10 mx-auto flex justify-between">
        <Link href={"/"}>
          <h1 className="text-black text-xl font-bold">Чиллиад</h1>
        </Link>
        <div className="flex items-center gap-4">
          {user && isAuth && (
            <Link href="/profile">
              <UserOutlined /> Профиль
            </Link>
          )}
          {pathname !== "/login" &&
            (!isAuth ? (
              <Link href="/login">
                <Button type="primary" icon={<LoginOutlined />}>
                  Войти
                </Button>
              </Link>
            ) : (
              <Button
                type="primary"
                icon={<LogoutOutlined />}
                onClick={() => logout()}
              >
                Выйти
              </Button>
            ))}
        </div>
      </div>
    </header>
  );
};
