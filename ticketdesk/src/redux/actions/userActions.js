export const SET_ALL_USERS = "SET_ALL_USERS";

export const setAllUsers = (users) => {
  return {
    type: SET_ALL_USERS,
    payload: users,
  };
};
