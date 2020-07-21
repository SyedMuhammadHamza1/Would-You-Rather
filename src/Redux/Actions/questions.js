export const GET_QUESTIONS = "GET_QUESTIONS";
export const ADD_ANSWER_TO_QUESTION = "ADD_ANSWER_TO_QUESTION";

export function getQuestions(questions) {
  return {
    type: GET_QUESTIONS,
    questions,
  };
}

export function addAnswerToQuestion(auth, qid, answer) {
  debugger;
  return {
    type: ADD_ANSWER_TO_QUESTION,
    auth,
    qid,
    answer,
  };
}
