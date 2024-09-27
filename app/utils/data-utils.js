import { HttpUtils } from "./http-utils";

export const BASE_URL = "http://localhost:3001/api";

export const Rooms = {
  getAllRooms: () => {
    return HttpUtils.get(`${BASE_URL}/rooms`);
  },
  getFreeRooms: (body) => {
    return HttpUtils.post(`${BASE_URL}/rooms/free`, { body });
  },
  getRoom: (id) => {
    return HttpUtils.get(`${BASE_URL}/rooms/${id}`);
  },
};
export const Rentals = {
  createRental: (body) => {
    return HttpUtils.post(`${BASE_URL}/rentals`, { body });
  },
  updateRentalStatus: (id, body, jwt) => {
    return HttpUtils.put(`${BASE_URL}/rentals/${id}`, {
      body,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${jwt}`,
      },
    });
  },
  getRentals: () => {
    return HttpUtils.get(`${BASE_URL}/rentals`);
  },
};

export const User = {
  authorize: (body) => {
    return HttpUtils.post(`${BASE_URL}/auth/login`, { body });
  },
  register: (body) => {
    return HttpUtils.post(`${BASE_URL}/users`, { body });
  },
  getMe: (jwt) => {
    return HttpUtils.get(`${BASE_URL}/me`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
  },
  verifyAccess: (jwt) => {
    return HttpUtils.get(`${BASE_URL}/dashboard`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
  },
  getRentals: (id, jwt) => {
    return HttpUtils.get(`${BASE_URL}/rentals/user/${id}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
  },
};
