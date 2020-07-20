import { SET_AUTH } from "../Actions/auth";

export default function auth(state = null, action) {
  if (action.type === SET_AUTH) {
    return action.id;
  }
  return state;
}
