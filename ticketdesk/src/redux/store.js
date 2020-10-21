import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { userReducer } from "./reducers/userReducer";
import { ticketReducer } from "./reducers/ticketReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const rootPersistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ["User", "Tickets"],
};

const userPersistConfig = {
  key: "User",
  storage: storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ["error"],
};

const ticketPersistConfig = {
  key: "Tickets",
  storage: storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ["error"],
};

export const rootReducer = combineReducers({
  User: persistReducer(userPersistConfig, userReducer),
  Tickets: persistReducer(ticketPersistConfig, ticketReducer),
});

const initialState = {};

const pReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = createStore(
  pReducer,
  initialState,
  compose(applyMiddleware(thunk), composeWithDevTools())
);

export const persistor = persistStore(store);
