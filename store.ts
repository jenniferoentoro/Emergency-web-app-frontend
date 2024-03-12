// store.ts
import { createStore, combineReducers } from "redux";
import chatReducer from "./reducers/chat/chatReducer"; // Create this reducer
import userReducer from "./reducers/user/userReducer"; // Create this reducer
const rootReducer = combineReducers({
  chat: chatReducer,
  user: userReducer,
  // Add other reducers here if needed
});

const store = createStore(rootReducer);

export default store;
