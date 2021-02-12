import React, { Component } from "react";
import { Scene, Router } from "react-native-router-flux";
import Choose from "./components/Choose";
import Todo from "./components/Todo";
import Notes from "./components/Notes";
import Reminder from "./components/Reminder";
import Login from "./components/Login";
import { connect } from "react-redux";

class RouterComponent extends Component {
  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar>
          {!this.props.user && (
            <Scene key="auth">
              <Scene key="login" component={Login} initial />
            </Scene>
          )}
          {this.props.user && (
            <Scene key="main" hideNavBar>
              <Scene key="choosetask" component={Choose} title="Choose Task" />
              <Scene key="notes" component={Notes} title="Add Notes" />
              <Scene key="todo" component={Todo} title="Add Todo" />
              <Scene key="reminder" component={Reminder} title="Add Reminder" />
            </Scene>
          )}
        </Scene>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state.auth;

  return { user };
};
export default connect(mapStateToProps)(RouterComponent);
