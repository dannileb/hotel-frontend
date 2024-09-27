import { create } from "zustand";
import { getJWT, removeJWT, setJWT } from "../utils/auth-utils";
import { User } from "../utils/data-utils";

export const userStore = create((set) => ({
  isAuth: false,
  user: null,
  token: null,
  login: (user, token) => {
    set({ isAuth: true, user, token });
    setJWT(token);
  },
  logout: () => {
    set({ isAuth: false, user: null, token: null });
    removeJWT();
  },
  checkAuth: async () => {
    const jwt = getJWT();
    if (jwt) {
      try {
        const { user } = await User.getMe(jwt);
        if (user) {
          set({ isAuth: true, user: { ...user, id: user._id }, token: jwt });
          setJWT(jwt);
        }
      } catch {
        set({ isAuth: false, user: null, token: null });
        removeJWT();
      }
    } else {
      set({ isAuth: false, user: null, token: null });
    }
  },
}));
