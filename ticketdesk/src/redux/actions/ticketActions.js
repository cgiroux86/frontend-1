export const SET_SELECTED_TICKET = "SET_SELECTED_TICKET";
export const FETCH_ALL_TICKETS = "FETCH_ALL_TICKETS";
export const UPDATE_PRIORITY = "UPDATE_PRIORITY";
export const UPDATE_ASSIGNED = "UPDATE_ASSIGNED";
export const UPDATE_TICKET_RESPONSES = "UPDATE_TICKET_RESPONSES";
export const UPDATE_TICKET_DEPARTMENT = "UPDATE_TICKET_DEPARTMENT";
export const RESET_TICKET_VIEWED = "RESET_TICKET_VIEWED";
export const UPDATE_TICKET_STATUS = "UPDATE_TICKET_STATUS";

export const setSelectedTicket = (ticket) => {
  return {
    type: SET_SELECTED_TICKET,
    payload: ticket,
  };
};

export const fetchAllTickets = (tickets) => {
  return {
    type: FETCH_ALL_TICKETS,
    payload: tickets,
  };
};

export const updatePriority = (priority) => {
  return { type: UPDATE_PRIORITY, payload: priority };
};

export const updateAssigned = (assigned) => {
  return {
    type: UPDATE_ASSIGNED,
    payload: assigned,
  };
};

export const updateTicketResponses = (responses) => {
  return { type: UPDATE_TICKET_RESPONSES, payload: responses };
};

export const updateTicketDepartment = (department) => {
  return {
    type: UPDATE_TICKET_DEPARTMENT,
    payload: department,
  };
};

export const resetTicketViewed = (bool) => {
  return {
    type: RESET_TICKET_VIEWED,
    payload: bool,
  };
};

export const updateTicketStatus = (status) => {
  return {
    type: UPDATE_TICKET_STATUS,
    payload: status,
  };
};
