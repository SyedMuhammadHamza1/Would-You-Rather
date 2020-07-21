import { saveQuestionAnswer } from "../../utils/api";
import { addAnswerToQuestion } from "../Actions/questions";
export const GET_USERS = "GET_USERS";
export const ADD_ANSWER_TO_USER = "ADD_ANSWER_TO_USER";

export function getUsers(users) {
  return {
    type: GET_USERS,
    users,
  };
}

function addAnswerToUser(auth, qid, answer) {
  debugger;
  return {
    type: ADD_ANSWER_TO_USER,
    auth,
    qid,
    answer,
  };
}

export function handleSaveQuestionAnswer(auth, qid, answer) {
  debugger;
  return (dispatch) => {
    dispatch(addAnswerToUser(auth, qid, answer));
    dispatch(addAnswerToQuestion(auth, qid, answer));

    return saveQuestionAnswer(auth, qid, answer).catch((e) => {
      console.warn("Error in handleSaveQuestionAnswer:", e);
    });
  };
}
