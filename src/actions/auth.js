import { GET_USER, AUTH_ERROR } from "./type";
import { auth } from "../Firebase";

export const getUser = () => async (dispatch) => {
  await auth.onAuthStateChanged((user) => {
    if (user) {
      dispatch({
        type: GET_USER,
        payload: user,
      });
    } else {
      dispatch({ type: AUTH_ERROR });
    }
  });
};
