"use client";
import { Button } from "antd";
import { RangePicker } from "../RangePicker/RangePicker";

export const SearchPanel = (props) => {
  const { onClick, ...newProps } = { ...props };
  const customLocale = {
    lang: {
      rangePlaceholder: ["Заезд", "Выезд"],
    },
  };
  return (
    <div className="px-8 py-4 bg-blue-500 flex gap-2 items-center justify-center flex-wrap">
      <p className="text-slate-50">Выберите даты</p>
      <RangePicker {...props} />
      <Button onClick={onClick}>Найти номера</Button>
    </div>
  );
};
