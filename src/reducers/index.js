import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import Main from "./MainNotes";
import NotesReducer from "./NotesReducer";
import reminder from "./ReminderReducer";

export default combineReducers({
  auth: AuthReducer,
  main: Main,
  notes: NotesReducer,
  reminder: reminder,
});
