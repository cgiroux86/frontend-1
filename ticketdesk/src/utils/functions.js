import { formatDate } from "./formatDate";
export function getPriority(priority) {
  switch (priority) {
    case "HIGH":
      return "high_priority";
    case "MEDIUM":
      return "medium_priority";
    case "LOW":
      return "low_priority";
    default:
      return "no_priority";
  }
}

export function convertPriorityToNumber(priority) {
  switch (priority) {
    case "HIGH":
      return 3;
    case "MEDIUM":
      return 2;
    case "LOW":
      return 1;
    default:
      return 0;
  }
}

export function sortFilterTickets(...args) {
  if (args[1] === "sort") {
    let t = args[0].sort((a, b) => {
      if (args[2] === "submit") {
        if (formatDate(a.created_at) < formatDate(b.created_at)) return -1;
        if (formatDate(a.created_at) > formatDate(b.created_at)) return 1;
        return 0;
      }
      if (args[2] === "urgency") {
        if (
          convertPriorityToNumber(a.priority) >
          convertPriorityToNumber(b.priority)
        )
          return -1;
        if (
          convertPriorityToNumber(a.priority) <
          convertPriorityToNumber(b.priority)
        )
          return 1;
        return 0;
      }
      if (args[2] === "category") {
        return a.department;
      }
    });
    return t;
  }
  if (args[1] === "filter") {
    const filtered = args[0].filter((ticket) => {
      return ticket[args[3]] === args[2];
    });
    return filtered;
  }
  if (args[0] === "filterSort") {
  }
}

export function resetSelectedState(setSort, setUrgency, setStatus) {
  setSort({ submit: false, urgency: false, category: false });
  setUrgency({
    low: false,
    medium: false,
    high: false,
  });

  setStatus({ not_started: false, in_progress: false, complete: false });
}

export function shouldDisplayButton(sort, urgency, status) {
  const sortedState = Object.values(sort).filter((item) => item);
  const urgencyState = Object.values(urgency).filter((item) => item);
  const statusState = Object.values(status).filter((item) => item);

  if (sortedState.length || urgencyState.length || statusState.length)
    return true;
  return false;
}

export const setTicketIconColor = (tickets) => {
  if (tickets.length === 0) return "green";
  if (tickets.length > 0 && tickets.length < 4) return "yellow";
  if (tickets.length >= 4) return "red";
};

export const shouldDisplayInfo = (user, ticket) => {
  if (
    user.admin ||
    userOwnsTicket(user, ticket) ||
    userAssignedTicket(user, ticket)
  )
    return true;
  return false;
};

export const userOwnsTicket = (user, ticket) => {
  return ticket.created_by === user.id;
};

export const userAssignedTicket = (user, ticket) => {
  return ticket.assigned_to === user.id;
};

export const getCardTicketStatus = (ticket) => {
  switch (ticket.status) {
    case "in progress":
      return "yellow";
    case "complete":
      return "green";
    default:
      return "magenta";
  }
};
