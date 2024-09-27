"use client";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

export const RangePicker = ({ disabledDates, ...props }) => {
  const disabledDate = (current) => {
    if (current && current.isBefore(dayjs().startOf("day"))) {
      return true;
    }

    const currentDate = current.startOf("day");

    return disabledDates
      ? disabledDates.some((range) => {
          const from = dayjs(range.from).startOf("day");
          const to = dayjs(range.to).endOf("day");
          return currentDate.isBetween(from, to, null, "[]");
        })
      : undefined;
  };

  return <DatePicker.RangePicker disabledDate={disabledDate} {...props} />;
};
