import { AUTH_ERROR, GET_USER } from "../actions/type";

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USER:
      return {
        ...state,
        user: payload,
        loading: false,
        isAuthenticated: true,
      };

    case AUTH_ERROR:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
      };

    default:
      return state;
  }
}
