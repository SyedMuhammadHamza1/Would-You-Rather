import { getInitialData } from "../../utils/api";
import { getQuestions } from "../Actions/questions";
import { getUsers } from "../Actions/users";

export function handleInitialData() {
  return (dispatch) => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(getQuestions(questions));
      dispatch(getUsers(users));
    });
  };
}
