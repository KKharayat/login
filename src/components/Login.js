import React, { Component } from "react";
import { connect } from "react-redux";
import { emailChanged, passwordChanged, loginUser } from "../actions/index";
import { Button, TextInput, View, StyleSheet, Text } from "react-native";
import FormButton from "./FormButtons/FormButton";
import FormInput from "./FormButtons/FormInput";

class Login extends Component {
  onEmailChange = (text) => {
    this.props.emailChanged(text);
  };

  onPasswordChange = (text) => {
    this.props.passwordChanged(text);
  };
  onButtonPress = () => {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  };

  renderButton = () => {
    if (this.props.loading) {
      return <Text style={styles.loading}>Loading..</Text>;
    }
    return <FormButton buttonTitle="Log in" onPress={this.onButtonPress} />;
  };
  renderError() {
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: "white" }}>
          <Text style={styles.error}>{this.props.error}</Text>
        </View>
      );
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>Todo App</Text>
          <FormInput
            value={this.props.email}
            onChangeText={this.onEmailChange}
            placeholder="Enter Email"
            icon="user"
            autoCapitalize="none"
          />

          <FormInput
            value={this.props.password}
            onChangeText={this.onPasswordChange}
            placeholder="Enter Password"
            icon="lock"
            secureTextEntry={true}
            autoCapitalize="none"
          />
        </View>

        {this.renderButton()}
        {this.renderError()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
  },
  text: {
    fontSize: 28,
    marginBottom: 10,
    color: "#051d5f",
  },
  error: {
    fontSize: 20,
    alignSelf: "center",
    color: "red",
  },
  loading: {
    fontSize: 20,
    alignSelf: "center",
    color: "black",
  },
});

const mapStateToProps = (state) => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading,
  };
};
export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  loginUser,
})(Login);
