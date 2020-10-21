import { SET_ALL_USERS, LOGIN_USER } from "../actions/userActions";

const initialState = {
  id: null,
  email: null,
  first_name: null,
  last_name: null,
  admin: false,
  is_logged: false,
  users: [],
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ALL_USERS:
      return {
        ...state,
        users: payload,
      };
    case LOGIN_USER:
      return {
        ...state,
        id: payload.id,
        email: payload.email,
        first_name: payload.first_name,
        last_name: payload.last_name,
        admin: payload.admin,
        is_logged: true,
      };
    default:
      return state;
  }
};
