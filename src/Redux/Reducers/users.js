import { GET_USERS } from "../Actions/users";

export default function authUser(state = {}, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        ...action.users,
      };
    default:
      return state;
  }
}
