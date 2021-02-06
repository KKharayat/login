import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";

class Choose extends Component {
  render() {
    return (
      <View style={styles.view}>
        <Text
          onPress={() => {
            Actions.notes();
          }}
          style={styles.text}
        >
          Add Notes
        </Text>
        <Text
          onPress={() => {
            Actions.todo();
          }}
          style={styles.text}
        >
          Add Todo
        </Text>
        <Text
          onPress={() => {
            Actions.reminder();
          }}
          style={styles.text}
        >
          Add Reminders
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 26,
    marginVertical: 10,
    borderBottomWidth: 1,
  },
  view: {
    marginHorizontal: 10,
  },
});
export default Choose;
