import React, { Component } from "react";
import { Scene, Router, Actions } from "react-native-router-flux";
import Choose from "./components/Choose";
import Todo from "./components/Todo";
import Notes from "./components/Notes";
import Reminder from "./components/Reminder";
import Login from "./components/Login";

class RouterComponent extends Component {
  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar>
          <Scene key="auth">
            <Scene key="login" component={Login} title="Please Login" initial />
          </Scene>
          <Scene key="main">
            <Scene
              rightTitle="Logout"
              onRight={() => Actions.auth()}
              key="choosetask"
              component={Choose}
              title="Choose Task"
            />
            <Scene key="notes" component={Notes} title="Add Notes" />
            <Scene key="todo" component={Todo} title="Add Todo" />
            <Scene key="reminder" component={Reminder} title="Add Reminder" />
          </Scene>
        </Scene>
      </Router>
    );
  }
}
export default RouterComponent;
