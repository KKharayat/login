import React, { Component } from "react";
import { connect } from "react-redux";
import { emailChanged, passwordChanged, loginUser } from "../actions/index";
import { Button, TextInput, View, StyleSheet, Text } from "react-native";

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
    return <Button onPress={this.onButtonPress} title="Log in" />;
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
      <View
        style={{
          paddingTop: 40,
          justifyContent: "center",
        }}
      >
        <TextInput
          autoCapitalize="none"
          placeholder="Enter Email"
          onChangeText={this.onEmailChange}
          value={this.props.email}
          style={styles.input}
        />

        <TextInput
          secureTextEntry
          autoCapitalize="none"
          placeholder="Enter Password"
          value={this.props.password}
          onChangeText={this.onPasswordChange}
          style={styles.input}
        />
        {this.renderButton()}
        {this.renderError()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    color: "#000",
    marginHorizontal: 10,
    height: 50,
    borderBottomWidth: 2,
    padding: 5,
    borderBottomColor: "black",
    marginBottom: 20,
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
