import { GET_QUESTIONS } from "../Actions/questions";

export default function authUser(state = {}, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    default:
      return state;
  }
}
