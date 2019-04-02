import { SET_SIZE, GET_NEW_QUOTE } from "../actions/constants";

//initializing Quote Holder and Size parameter
const defaultState = {
  tempQuote: ["Ron Swanson American Hero"],
  size: ""
};
//Handling State for Quotes and Size
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
