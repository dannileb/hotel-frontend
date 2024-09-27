"use client";

import { useEffect, useState } from "react";
import { userStore } from "../stores/userStore";
import { Rentals, User } from "../utils/data-utils";
import { useRouter } from "next/navigation";
import { RentalsList } from "../components/RentalsList/RentalsList";
import Link from "next/link";

export default function page() {
  const { token, isAuth, user } = userStore();
  const [rentals, setRentals] = useState([]);
  const router = useRouter();
  useEffect(() => {
    if (token && isAuth) {
      User.verifyAccess(token)
        .then((response) => {
          Rentals.getRentals()
            .then((rentals) => {
              setRentals(rentals);
            })
            .catch((error) => console.log(error));
        })
        .catch(() => {
          router.push("/");
        });
    }
  }, [token, isAuth]);
  return (
    <>
      {token && isAuth ? (
        <section>
          <p className="my-4 text-2xl">Список бронирования</p>
          <RentalsList rentals={rentals} isAdmin={true} />
        </section>
      ) : (
        <div className="my-4 text-center">
          <p>Список бронирования доступен только администраторам!</p>
          <Link href="/" className="text-blue-500">
            На главную
          </Link>
        </div>
      )}
    </>
  );
}
