export const SET_ALL_USERS = "SET_ALL_USERS";
export const LOGIN_USER = "LOGIN_USER";
export const SET_ADMIN_VIEW = "SET_ADMIN_VIEW";
export const FETCH_ADMINS = "FETCH_ADMINS";
export const FETCH_USER_TICKETS = "FETCH_USER_TICKETS";

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

export const setAdminView = (bool) => {
  return {
    type: SET_ADMIN_VIEW,
    payload: bool,
  };
};

export const fetchAdmins = (admins) => {
  return {
    type: FETCH_ADMINS,
    payload: admins,
  };
};

export const fetchUserTickets = (tickets) => {
  return {
    type: FETCH_USER_TICKETS,
    payload: tickets,
  };
};
