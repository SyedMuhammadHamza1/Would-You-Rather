import { combineReducers } from "redux";
import auth from "../Reducers/auth";
import questions from "../Reducers/questions";
import users from "../Reducers/users";

export default combineReducers({
  auth,
  questions,
  users,
});
