import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    id: null,
    email: null,
    first_name: null,
    last_name: null,
    users: [],
  },
});
