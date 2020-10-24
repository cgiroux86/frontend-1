import {
  SET_ALL_USERS,
  LOGIN_USER,
  SET_ADMIN_VIEW,
  FETCH_ADMINS,
  FETCH_USER_TICKETS,
} from "../actions/userActions";

const initialState = {
  id: null,
  email: null,
  first_name: null,
  last_name: null,
  admin: false,
  is_logged: false,
  users: [],
  admins: [],
  tickets: [],
  assigned_tickets: [],
  is_admin_view: false,
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
    case SET_ADMIN_VIEW:
      return {
        ...state,
        is_admin_view: payload,
      };
    case FETCH_ADMINS:
      return {
        ...state,
        admins: payload,
      };
    case FETCH_USER_TICKETS:
      return {
        ...state,
        tickets: payload,
      };
    default:
      return state;
  }
};
