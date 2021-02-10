import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import Header from "./Header";
import { MaterialIcons } from "@expo/vector-icons";

class Choose extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          title={"Choose Task"}
          icon={<MaterialIcons name="notes" size={24} color="black" />}
        />
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
    flex: 1,

    marginHorizontal: 10,
    marginTop: 10,
    alignItems: "center",
  },
});
export default Choose;
