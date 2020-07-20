import { SET_AUTH } from "../Actions/auth";

export default function authUser(state = null, action) {
  if (action.type === SET_AUTH) {
    return action.id;
  }
  return state;
}
