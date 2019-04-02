import { SET_SIZE, GET_NEW_QUOTE } from "../actions/constants";
const defaultState = {
  tempQuote: ["Yo"],
  size: ""
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_NEW_QUOTE:
      return {
        ...state,
        tempQuote: action.payload
      };
    case SET_SIZE:
      return {
        ...state,
        size: action.payload
      };

    default:
      return state;
  }
};
