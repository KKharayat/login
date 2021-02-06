import {
  NOTES_UPDATE,
  NOTES_CREATED,
  NOTES_FETCH_SUCCESS,
} from "../actions/types";

const INITIAL_STATE = { title: "", body: "" };
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NOTES_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case NOTES_CREATED:
      return INITIAL_STATE;
    case NOTES_FETCH_SUCCESS:
      // console.log(action);
      return action.payload;

    default:
      return state;
  }
};
