export const SET_AUTH = "SET_AUTH";

export function setUserAuth(id) {
  return {
    type: SET_AUTH,
    id,
  };
}
