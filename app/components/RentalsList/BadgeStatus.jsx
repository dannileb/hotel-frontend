import { userStore } from "@/app/stores/userStore";
import { Rentals } from "@/app/utils/data-utils";
import { EditOutlined } from "@ant-design/icons";
import { Button, Select, message } from "antd";
import React, { useState } from "react";

export const BadgeStatus = ({ isAdmin, status, rentalId }) => {
  const { token } = userStore();
  const [badgeStatus, setBadgeStatus] = useState(status);
  const [isEditing, setIsEditing] = useState(false);
  const getStatusText = (option) => {
    const checkStatus = option ?? badgeStatus;
    switch (checkStatus) {
      case "booked":
        return "Ожидает подтверждения";
      case "active":
        return "Забронировано";
      case "cancelled":
        return "Отменено";
    }
  };

  const getStatusColor = (option) => {
    const checkStatus = option ?? badgeStatus;
    switch (checkStatus) {
      case "booked":
        return "yellow";
      case "active":
        return "green";
      case "cancelled":
        return "red";
    }
  };

  const handleChange = (value) => {
    if (rentalId && token) {
      Rentals.updateRentalStatus(rentalId, { status: value }, token)
        .then(() => {
          setBadgeStatus(value);
        })
        .catch(() => {
          message.error("Ошибка обновления статуса");
        })
        .finally(() => {
          setIsEditing(false);
        });
    }
  };
  return (
    <>
      {!isEditing ? (
        <div
          className={`rounded p-1 bg-${getStatusColor()}-300 font-light text-center`}
        >
          {getStatusText()}{" "}
          {isAdmin && (
            <Button
              type="text"
              icon={<EditOutlined onClick={() => setIsEditing(!isEditing)} />}
            />
          )}
        </div>
      ) : (
        <Select
          onChange={handleChange}
          defaultValue={{ value: status, label: getStatusText() }}
          options={[
            { value: "booked", label: "Ожидает бронирования" },
            { value: "active", label: "Забронировано" },
            { value: "cancelled", label: "Отменено" },
          ]}
          optionRender={(option) => (
            <div
              className={`rounded p-1 bg-${getStatusColor(
                option.value
              )}-300 font-light text-center`}
            >
              {getStatusText(option.value)}{" "}
            </div>
          )}
        />
      )}
    </>
  );
};
