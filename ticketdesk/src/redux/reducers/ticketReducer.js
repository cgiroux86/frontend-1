import {
  FETCH_ALL_TICKETS,
  SET_SELECTED_TICKET,
  UPDATE_PRIORITY,
  UPDATE_ASSIGNED,
  UPDATE_TICKET_RESPONSES,
  UPDATE_TICKET_DEPARTMENT,
  RESET_TICKET_VIEWED,
  UPDATE_TICKET_STATUS,
} from "../actions/ticketActions";

const initialState = {
  tickets: [],
  responses: [],
  priority: ["Low", "Medium", "High"],
  assigned: [],
  departments: ["HR", "Accounting", "IT", "Sales", "Other"],
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
    has_been_updated: false,
  },
};

export const ticketReducer = (state = initialState, { type, payload }) => {
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
          has_been_updated: true,
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
          has_been_updated: true,
        },
      };
    case UPDATE_TICKET_RESPONSES:
      return {
        ...state,
        tickets: payload.data,
        selected: {
          ...state.selected,
          responses: payload.responses,
        },
      };
    case UPDATE_TICKET_DEPARTMENT:
      return {
        ...state,
        selected: {
          ...state.selected,
          dept_id: payload,
          has_been_updated: true,
        },
      };
    case RESET_TICKET_VIEWED:
      return {
        ...state,
        selected: { ...state.selected, has_been_updated: false },
      };
    case UPDATE_TICKET_STATUS:
      return {
        ...state,
        selected: { ...state.selected, status: payload },
      };
    default:
      return state;
  }
};
