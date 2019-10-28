import { combineReducers } from "redux";

// Reducers
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import eventsReducer from "./eventsReducer";



const rootReducer = combineReducers({
  authReducer: authReducer,
  errorReducer: errorReducer,
  eventsRoot: eventsReducer
  
});
export default rootReducer;