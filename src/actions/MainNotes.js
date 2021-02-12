import firebase from "firebase";
import {
  TODO_UPLOADED,
  TODO_UPDATE,
  TODOS_FETCH_SUCCESS,
  NOTES_UPDATE,
  NOTES_CREATED,
  NOTES_FETCH_SUCCESS,
  REMINDER_UPDATE,
  REMINDER_CREATED,
  COLOR_UPDATE,
  DELETED,
} from "./types";

export const todoUpdate = ({ prop, value }) => {
  return {
    type: TODO_UPDATE,
    payload: { prop, value },
  };
};

export const todoUpload = ({ title, color }) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/todos`)
      .push()
      .set({ title, color })
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
      .push()
      .set({ title, body })
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
      .on("value", (snap) => {
        const previousNotes = [];
        snap.forEach((snap) => {
          previousNotes.push({
            id: snap.key,
            title: snap.val().title,
            body: snap.val().body,
          });
        });

        dispatch({ type: NOTES_FETCH_SUCCESS, payload: previousNotes });

        // console.log(snap.val());
      });
  };
};

export const deleteNotes = (id) => {
  const { currentUser } = firebase.auth();
  firebase.database().ref(`/users/${currentUser.uid}/notes`).child(id).remove();
  return { type: DELETED };
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
      .push()
      .set({ title, day })
      .then(() => {
        dispatch({ type: REMINDER_CREATED });
        console.log(currentUser);
      });
  };
};
