import {
  GET_QUESTIONS,
  ADD_ANSWER_TO_QUESTION,
  ADD_QUESTION,
} from "../Actions/questions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case ADD_ANSWER_TO_QUESTION:
      const { auth, qid, answer } = action;

      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat(auth),
          },
        },
      };
    case ADD_QUESTION:
      const { question } = action;

      return {
        ...state,
        [question.id]: question,
      };
    default:
      return state;
  }
}
