"use client";
import dayjs from "dayjs";
import Link from "next/link";
import { RoomCard } from "../RoomCard/RoomCard";
import { BadgeStatus } from "./BadgeStatus";

export const RentalsList = ({ rentals, isAdmin }) => {
  return (
    <>
      {rentals.length ? (
        <div className="flex gap-4">
          {rentals.map((rental) => {
            return (
              <div className="p-4 flex flex-col gap-4 rounded bg-sky-100">
                <RoomCard
                  className="flex rounded overflow-hidden"
                  room={rental.room}
                  size="small"
                  actions={[]}
                />
                <div className="flex flex-col gap-2">
                  <p>
                    Дата заезда:{" "}
                    <span className="font-bold">
                      {dayjs(rental.startDate).format("YYYY-MM-DD")}
                    </span>
                  </p>
                  <p>
                    Дата выезда:{" "}
                    <span className="font-bold">
                      {dayjs(rental.endDate).format("YYYY-MM-DD")}
                    </span>
                  </p>
                  <p>
                    Количество гостей:{" "}
                    <span className="font-bold">{rental.visitorsCount}</span>
                  </p>
                  <p>
                    Сумма оплаты:{" "}
                    <span className="font-bold">{rental.totalPrice}</span>
                  </p>
                  {isAdmin && (
                    <p>
                      Контакты гостя:{" "}
                      <span className="font-bold">
                        {rental.user.email} - {rental.user.name}
                      </span>
                    </p>
                  )}
                </div>
                <BadgeStatus
                  isAdmin={isAdmin}
                  status={rental.status}
                  rentalId={rental._id}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <p>
          Пока тут пусто.{" "}
          <Link href="/#rooms" className="text-blue-500">
            Посмотреть номера
          </Link>
        </p>
      )}
    </>
  );
};
