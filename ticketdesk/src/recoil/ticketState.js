import { atom } from "recoil";

export const ticketState = atom({
  key: "ticketState",
  default: {
    tickets: [],
    responses: [],
    priority: ["Low", "Medium", "High"],
    assigned: [],
    department: ["Human Resources", "Accounting", "IT", "Marketing"],
    selected: {
      ticket_id: null,
      description: null,
      attempted_solutions: null,
      submitted_by: 4,
      assigned_to: null,
      status: null,
      dept_id: null,
      priority: null,
      created_at: null,
      updated_at: null,
    },
  },
});
