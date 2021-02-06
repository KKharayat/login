import { REMINDER_UPDATE, REMINDER_CREATED } from "../actions/types";

const INITIAL_STATE = { title: "", day: "Monday" };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REMINDER_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case REMINDER_CREATED:
      return INITIAL_STATE;
    default:
      return state;
  }
};
