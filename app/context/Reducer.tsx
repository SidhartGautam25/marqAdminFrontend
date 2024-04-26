// reducer/UserReducer.ts
import { State } from "./Context";
import { Action } from "./Actions";
const Reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        error: false,
      };
    case "LOGIN_FAILED":
      return {
        user: null,
        error: true,
      };
    default:
      return state;
  }
};

export default Reducer;
