"use client";
import { CardsList } from "@/app/components/CardsList/CardsList";
import { RangePicker } from "@/app/components/RangePicker/RangePicker";
import { RoomCard } from "@/app/components/RoomCard/RoomCard";
import { userStore } from "@/app/stores/userStore";
import { Rentals, Rooms } from "@/app/utils/data-utils";
import { CloseOutlined, LoadingOutlined } from "@ant-design/icons";
import {
  Button,
  Carousel,
  Divider,
  InputNumber,
  Tooltip,
  Typography,
  message,
} from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function RoomPage({ params }) {
  const { user, isAuth, token } = userStore();
  const [room, setRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedDays, setSelectedDays] = useState(1);
  const [visitorsCount, setVisitorsCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, text: null });

  const roomId = params.id;
  useEffect(() => {
    Rooms.getRoom(roomId)
      .then((room) => {
        setRoom(room);
      })
      .catch((error) => console.log(error));
    Rooms.getAllRooms()
      .then((rooms) => setRooms(rooms))
      .catch((error) => console.log(error));
    if (status.type) {
      message[status.type](status.text);
    }
  }, [status]);

  useEffect(() => {
    if (selectedDates.length) {
      setSelectedDays(dayjs(selectedDates[1]).diff(selectedDates[0], "day"));
    }
  }, [selectedDates]);

  const handleRangePickerChange = (_, dateStrings) => {
    if (dateStrings.some((date) => !date.length)) {
      setSelectedDates([]);
      setSelectedDays(1);
      return;
    }
    setSelectedDates(dateStrings.map((date) => new Date(date)));
  };

  const handleBookingRoom = () => {
    if (!selectedDates[0] || !selectedDates[1] || !room) {
      return;
    }
    const rental = {
      user: user._id,
      room: roomId,
      startDate: selectedDates[0],
      endDate: selectedDates[1],
      totalPrice: room.price * selectedDays,
      visitorsCount,
    };
    setIsLoading(true);
    Rentals.createRental(rental)
      .then(() => {
        setSelectedDates([]);
        setStatus({
          type: "success",
          text: "Успешно забронировано! Менеджер свяжется с вами для уточнения бронирования и оплаты",
        });
      })
      .catch((error) => {
        setStatus({ type: "error", text: "Ошибка бронирования!" });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <section className="my-4 flex items-center gap-4">
        {room && (
          <>
            <div className="flex-1 flex justify-center">
              <Carousel arrows autoplay className="max-w-xl">
                {room.images.map((image, index) => {
                  return (
                    <div key={index}>
                      <img src={image} alt="room image" />
                    </div>
                  );
                })}
              </Carousel>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <h1 className="text-3xl font-bold self-center">
                Номер - {room.title}
              </h1>
              <p className="">{room.description}</p>
              <p className="font-light">
                Площадь номера :{" "}
                <span className="font-bold">{room.area} м²</span>
              </p>
              <p className="font-light">
                Размещение на этажах :{" "}
                <span className="font-bold">
                  {room.floor.map(
                    (floor, index, floors) =>
                      `${floor}${index !== floors.length - 1 ? ", " : ""}`
                  )}
                </span>
              </p>
              <p className="font-light">
                Максимальное количество кроватей :{" "}
                <span className="font-bold">{room.bedCount}</span>
              </p>
              <p className="text-xl font-light">
                <span className="font-bold">{room.price * selectedDays}₽</span>{" "}
                за <span>{selectedDays}</span>
                {selectedDays === 1 ? " сутки" : " суток"}
              </p>
              <div>
                <p>Выберите доступные даты размещения</p>
              </div>
              <div className="flex gap-4">
                <Tooltip
                  title={
                    isAuth
                      ? `Даты размещения`
                      : `Для бронирования необходима авторизация`
                  }
                >
                  <RangePicker
                    disabled={!isAuth}
                    disabledDates={room.rentalDates}
                    onChange={handleRangePickerChange}
                  />
                </Tooltip>
                <Tooltip
                  title={
                    isAuth
                      ? `Количество гостей`
                      : `Для бронирования необходима авторизация`
                  }
                >
                  <InputNumber
                    min={1}
                    max={room.bedCount}
                    value={visitorsCount}
                    disabled={!isAuth}
                    onChange={(value) => setVisitorsCount(value)}
                  />
                </Tooltip>
                <Button
                  type="primary"
                  onClick={handleBookingRoom}
                  disabled={!selectedDates.length || !isAuth}
                >
                  {!isLoading ? "Забронировать" : <LoadingOutlined />}
                </Button>
              </div>
            </div>
          </>
        )}
      </section>
      <Divider />
      <section className="my-4">
        <p className="my-4 text-center">
          Не нашли подходящей даты? Посмотрите другие номера или{" "}
          <Link href={"/#findFree"} className="text-blue-500">
            выберите номер под вашу дату
          </Link>
        </p>
        <CardsList
          data={rooms.filter((room) => {
            return room._id !== roomId;
          })}
          renderItemCallback={(room, index) => {
            return <RoomCard key={index} room={room} />;
          }}
        />
      </section>
    </>
  );
}
