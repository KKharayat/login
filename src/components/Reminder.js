import React, { Component } from "react";
import firebase from "firebase";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Button,
  FlatList,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { connect } from "react-redux";
import { reminderUpdate, reminderCreate } from "../actions/MainNotes";

class Reminder extends Component {
  state = { reminderlist: [] };
  componentDidMount() {
    const { currentUser } = firebase.auth();
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/reminder`)
      .on("value", (snapshot) => {
        let reminderlist = [];
        snapshot.forEach((snap) => {
          reminderlist.push(snap.val());
        });
        this.setState({ reminderlist: reminderlist });
      });
    console.log(this.state.reminderlist);
  }

  onButtonPress = () => {
    const { title, day } = this.props;
    this.props.reminderCreate({ title, day });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TextInput
          placeholder="Set reminder note"
          style={styles.input}
          value={this.props.title}
          onChangeText={(title) =>
            this.props.reminderUpdate({ prop: "title", value: title })
          }
        ></TextInput>
        <Text style={{ marginHorizontal: 10, marginVertical: 20 }}>
          Select Day for reminder
        </Text>
        <Picker
          style={styles.picker}
          selectedValue={this.props.day}
          onValueChange={(value) => {
            this.props.reminderUpdate({ prop: "day", value: value });
          }}
        >
          <Picker.Item label="Monday" value="monday" />
          <Picker.Item label="Tuesday" value="tuesday" />
          <Picker.Item label="Wednesday" value="wednesday" />
          <Picker.Item label="Thursday" value="thursday" />
          <Picker.Item label="Friday" value="friday" />
          <Picker.Item label="Saturday" value="saturday" />
          <Picker.Item label="Sunday" value="sunday" />
        </Picker>
        <Button title="Add" onPress={this.onButtonPress} />
        <FlatList
          data={this.state.reminderlist}
          renderItem={({ item }) => {
            return (
              <View>
                <Text style={styles.text}>
                  {item.title} - {item.day}
                </Text>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderBottomWidth: 1,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  picker: {
    height: 50,
    width: 200,
    alignSelf: "center",
  },
  text: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
});

const mapStateToProps = (state) => {
  const { title, day } = state.reminder;
  return { title, day };
};
export default connect(mapStateToProps, { reminderUpdate, reminderCreate })(
  Reminder
);
