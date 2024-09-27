import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { App } from "./App";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Отель Чиллиад",
  description: "Веб-приложение для бронирования номеров в отеле",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body
        className={`${inter.className} min-h-screen flex flex-col bg-slate-50`}
      >
        <App>{children}</App>
      </body>
    </html>
  );
}
