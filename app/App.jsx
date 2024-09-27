"use client";

import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";

import { useEffect } from "react";
import { userStore } from "./stores/userStore";

export const App = ({ children }) => {
  const { checkAuth } = userStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <Header />
      <main className="container px-10 my-0 mx-auto flex-1">{children}</main>
      <Footer />
    </>
  );
};
