export const SET_ALL_USERS = "SET_ALL_USERS";

export const setAllUsers = (users) => {
  console.log("USERS", users);
  return {
    type: SET_ALL_USERS,
    payload: users,
  };
};
