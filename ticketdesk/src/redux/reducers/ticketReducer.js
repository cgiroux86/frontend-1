import {
  FETCH_ALL_TICKETS,
  SET_SELECTED_TICKET,
  UPDATE_PRIORITY,
  UPDATE_ASSIGNED,
  UPDATE_TICKET_RESPONSES,
} from "../actions/ticketActions";

const initialState = {
  tickets: [],
  responses: [],
  priority: ["Low", "Medium", "High"],
  assigned: [],
  department: ["Human Resources", "Accounting", "IT", "Marketing"],
  selected: {
    ticket_id: null,
    description: null,
    attempted_solutions: null,
    submitted_by: null,
    assigned_to: null,
    status: null,
    dept_id: null,
    priority: null,
    created_at: null,
    updated_at: null,
  },
};

export const ticketReducer = (state = initialState, { type, payload }) => {
  console.log("TICKET PAYLOAD", payload);
  switch (type) {
    case SET_SELECTED_TICKET:
      return {
        ...state,
        selected: payload,
      };
    case FETCH_ALL_TICKETS:
      return {
        ...state,
        tickets: payload,
      };
    case UPDATE_PRIORITY:
      return {
        ...state,
        selected: {
          ...state.selected,
          priority: payload,
        },
      };
    case UPDATE_ASSIGNED:
      return {
        ...state,
        selected: {
          ...state.selected,
          assigned_to: payload.id,
          assigned_first: payload.first_name,
          assigned_last: payload.last_name,
        },
      };
    case UPDATE_TICKET_RESPONSES:
      return {
        ...state,
        tickets: payload.data,
        selected: { ...state.selected, responses: payload.responses },
      };
    default:
      return state;
  }
};
