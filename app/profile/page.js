"use client";

import { useEffect, useState } from "react";
import { userStore } from "../stores/userStore";
import { User } from "../utils/data-utils";
import Link from "next/link";
import { RentalsList } from "../components/RentalsList/RentalsList";

export default function ProfilePage() {
  const { user, token, isAuth } = userStore();
  const [rentals, setRentals] = useState([]);
  useEffect(() => {
    if (isAuth) {
      User.getRentals(user._id, token)
        .then((rentals) => {
          rentals.reverse();
          setRentals(rentals);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  return (
    <>
      <section className="pt-4 mx-auto">
        {isAuth ? (
          <>
            <p className="text-3xl font-bold text-center">
              {user.name} {user.surname}
            </p>
            <div className="flex flex-col">
              <p className="mb-4 text-2xl">Ваше бронирование </p>
              <RentalsList rentals={rentals} />
            </div>
          </>
        ) : (
          <p className="mt-4 text-center">
            Кажется, вы не авторизованы:({" "}
            <Link href="/login" className="text-blue-500">
              Авторизоваться?
            </Link>
          </p>
        )}
      </section>
    </>
  );
}
