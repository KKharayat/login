import firebase from "firebase";
import {
  ADD_TODO,
  CHANGE_MESSAGE,
  NOTES_UPDATE,
  NOTES_CREATED,
  NOTES_FETCH_SUCCESS,
  TODO_UPLOADED,
  REMINDER_UPDATE,
  REMINDER_CREATED,
} from "./types";

export const changeMessage = (message) => {
  return {
    type: CHANGE_MESSAGE,
    payload: message,
  };
};

export const addTodo = (message) => {
  return {
    type: ADD_TODO,
    payload: message,
  };
};

export const todoUpload = (message) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/todos`)
      .push(message)
      .then(() => {
        dispatch({ type: TODO_UPLOADED });
      });
  };
};

//Notes
export const notesUpdate = ({ prop, value }) => {
  return {
    type: NOTES_UPDATE,
    payload: { prop, value },
  };
};

export const noteCreate = ({ title, body }) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/notes`)
      .push({ title, body })
      .then(() => {
        dispatch({ type: NOTES_CREATED });
      });
  };
};

export const notesFetch = () => {
  return (dispatch) => {
    const { currentUser } = firebase.auth();
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/notes`)
      .on("value", (snapshot) => {
        dispatch({ type: NOTES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

//Reminder

export const reminderUpdate = ({ prop, value }) => {
  return {
    type: REMINDER_UPDATE,
    payload: { prop, value },
  };
};

export const reminderCreate = ({ title, day }) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/reminder`)
      .push({ title, day })
      .then(() => {
        dispatch({ type: REMINDER_CREATED });
      });
  };
};
