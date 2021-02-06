import { ADD_TODO, CHANGE_MESSAGE, TODO_UPLOADED } from "../actions/types";

const INITIAL_STATE = { todo: "", todos: [], title: "", body: "" };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_MESSAGE:
      return { ...state, todo: action.payload };
    case ADD_TODO:
      return {
        ...state,
        todos: [action.payload, ...state.todos],
      };

    case TODO_UPLOADED:
      return INITIAL_STATE;

    default:
      return state;
  }
};
