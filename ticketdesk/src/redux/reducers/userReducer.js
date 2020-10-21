import { SET_ALL_USERS } from "../actions/userActions";

const initialState = {
  id: null,
  email: null,
  first_name: null,
  last_name: null,
  users: [],
};

export const userReducer = (state = initialState, { type, payload }) => {
  console.log("REDUX PAYLOAD", payload);
  switch (type) {
    case SET_ALL_USERS:
      return {
        ...state,
        users: payload,
      };
    default:
      return state;
  }
};
