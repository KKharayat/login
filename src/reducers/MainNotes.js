import {
  TODO_UPLOADED,
  TODO_UPDATE,
  TODOS_FETCH_SUCCESS,
  COLOR_UPDATE,
} from "../actions/types";

const INITIAL_STATE = { title: "", color: "", todos: "" };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TODO_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case TODO_UPLOADED:
      return INITIAL_STATE;

    default:
      return state;
  }
};
