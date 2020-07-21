import {
  GET_USERS,
  ADD_ANSWER_TO_USER,
  ADD_QUESTION_FOR_USER,
} from "../Actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        ...action.users,
      };

    case ADD_ANSWER_TO_USER:
      const { auth, qid, answer } = action;
      debugger;
      return {
        ...state,
        [auth]: {
          ...state[auth],
          answers: {
            ...state[auth].answers,
            [qid]: answer,
          },
        },
      };
    case ADD_QUESTION_FOR_USER:
      const { id, author } = action;

      return {
        ...state,
        [author]: {
          ...state[author],
          questions: state[author].questions.concat(id),
        },
      };
    default:
      return state;
  }
}
