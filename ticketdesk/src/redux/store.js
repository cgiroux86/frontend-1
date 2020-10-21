import { createStore, combineReducers, applyMiddleware } from "redux";
import { userReducer } from "./reducers/userReducer";
import { ticketReducer } from "./reducers/ticketReducer";
import thunk from "redux-thunk";

export const rootReducer = combineReducers({
  User: userReducer,
  Tickets: ticketReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
