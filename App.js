import React from "react";
import Router from "./src/Router";
import ReduxThunk from "redux-thunk";
import reducers from "./src/reducers/index";
import firebase from "firebase";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

class App extends React.Component {
  componentDidMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyC4t4EjkflHmnrh55k3sOr4493zmOy4WZk",
      authDomain: "authentication-93d94.firebaseapp.com",
      projectId: "authentication-93d94",
      storageBucket: "authentication-93d94.appspot.com",
      messagingSenderId: "975044234504",
      appId: "1:975044234504:web:ce2ea5b6cd2239b339b0bd",
      measurementId: "G-J6ET5CF2MD",
    });
  }
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
