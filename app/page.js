"use client";
import { Divider } from "antd";
import { SearchPanel } from "./components/SearchPanel/SearchPanel";
import Styles from "./main.module.css";
import { Rooms } from "./utils/data-utils";
import { RoomCard } from "./components/RoomCard/RoomCard";
import { CardsList } from "./components/CardsList/CardsList";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [rooms, setRooms] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [freeRooms, setFreeRooms] = useState(null);

  useEffect(() => {
    Rooms.getAllRooms()
      .then((rooms) => setRooms(rooms))
      .catch((error) => console.log(error));
  }, []);

  const handleRangePickerChange = (_, dateStrings) => {
    if (dateStrings.some((date) => !date.length)) {
      setSelectedDates([]);
      setFreeRooms(null);
      return;
    }
    setSelectedDates(dateStrings.map((date) => new Date(date)));
  };

  const handleCheckBookings = () => {
    if (!selectedDates[0] || !selectedDates[1]) {
      return;
    }
    Rooms.getFreeRooms({
      from: selectedDates[0],
      to: selectedDates[1],
    })
      .then((freeRooms) => setFreeRooms(freeRooms))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <section
        className={`my-4 mx-auto flex flex-col items-center justify-center gap-8 text-slate-50`}
        id="findFree"
      >
        <div
          className={`rounded flex flex-column items-center ${Styles.mainSection}`}
        >
          <div
            className={`rounded p-8 bg-slate-500/50 ${Styles.mainSectionContent}`}
          >
            <h1 className="text-5xl font-bold">Добро пожаловать в Чиллиад!</h1>
            <p className="my-4">
              Проведите свой отдых в одном из лучших отлей побережья 🌴
            </p>
            <div className="rounded overflow-hidden">
              <SearchPanel
                onChange={handleRangePickerChange}
                onClick={handleCheckBookings}
              />
            </div>
          </div>
        </div>
      </section>
      {}
      <Divider />
      {freeRooms && (
        <>
          <section>
            <h2 className="text-3xl my-4">В выбранные даты свободны: </h2>
            <CardsList
              data={freeRooms}
              renderItemCallback={(room, index) => {
                return <RoomCard key={index} room={room} />;
              }}
            />
          </section>
          <Divider />
        </>
      )}
      <section className="container my-0 mx-auto" id={"rooms"}>
        <h2 className="text-3xl my-4">Выбор номеров</h2>
        <CardsList
          data={rooms}
          renderItemCallback={(room, index) => {
            return <RoomCard key={index} room={room} />;
          }}
        />
      </section>
      <Divider />
      <section className="my-4 mx-auto flex items-center justify-center gap-4">
        <div className="flex-1">
          <h2 className="text-3xl">Что такое Чиллиад?</h2>
          <p>
            В погоне за впечатлениями важно возвращаться туда, где можно хорошо
            отдохнуть. Отель Чиллиад находится в самом сердце города. Перед сном
            есть возможность прогуляться вдоль главных достопримечательностей.
            Рядом с отелем можно прогуляться. Неподалёку: Большие ворота,
            Аквапарк Серебряный и Центральный пляжи.
          </p>
        </div>
        <img className="max-w-lg rounded" src="./hotel-outside.jpeg" />
      </section>
      <section className="my-4 mx-auto flex items-center justify-center gap-4">
        <img className="max-w-lg rounded" src="./pool.jpeg" />
        <div className="flex-1">
          <h2 className="text-3xl">Чем можем порадовать?</h2>
          <p>
            Попробовать новые блюда и отдохнуть можно в ресторане. Попробуйте
            кофе в кафе — вдруг именно он станет лучшим в городе? Специально для
            автопутешественников организована парковка. Среди услуг для красоты
            и здоровья — сауна, спа-центр и баня. Для тех, кто не представляет
            отдых без водных удовольствий, есть открытый бассейн. В отеле есть
            игровые детские комнаты. Будьте готовы к тому, что детям будет
            весело, а вам придется коротать вечер со взрослыми.
          </p>
          <Link href={"/#rooms"} className="text-blue-500">
            Посмотреть номера
          </Link>
        </div>
      </section>
    </>
  );
}
