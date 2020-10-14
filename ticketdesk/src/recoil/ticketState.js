import { atom, selector } from "recoil";

export const ticketState = atom({
  key: "ticketState",
  default: {
    tickets: [],
    responses: [],
    selected: {
      id: null,
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
