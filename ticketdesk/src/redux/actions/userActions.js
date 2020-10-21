export const SET_ALL_USERS = "SET_ALL_USERS";
export const LOGIN_USER = "LOGIN_USER";

export const setAllUsers = (users) => {
  return {
    type: SET_ALL_USERS,
    payload: users,
  };
};

export const loginUser = (user) => {
  return {
    type: LOGIN_USER,
    payload: user,
  };
};
