import React, { Component } from "react";
import firebase from "firebase";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { connect } from "react-redux";
import { reminderUpdate, reminderCreate } from "../actions/MainNotes";

class Reminder extends Component {
  state = { reminderlist: [] };

  componentDidMount() {
    const previousReminder = this.state.reminderlist;
    const { currentUser } = firebase.auth();
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/reminder`)
      .on("child_added", (snap) => {
        previousReminder.push({
          id: snap.key,
          title: snap.val().title,
          day: snap.val().day,
        });
        this.setState({ reminderlist: previousReminder });
        firebase
          .database()
          .ref(`/users/${currentUser.uid}/reminder`)
          .on("child_removed", (snap) => {
            for (var i = 0; i < previousReminder.length; i++) {
              if (previousReminder[i].id === snap.key) {
                previousReminder.splice(i, 1);
              }
            }
            this.setState({
              reminderlist: previousReminder,
            });
          });
      });
    console.log(this.state.reminderlist);
  }

  onButtonPress = () => {
    const { title, day } = this.props;
    this.props.reminderCreate({ title, day });
  };

  onDeleteReminder = (id) => {
    const { currentUser } = firebase.auth();
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/reminder`)
      .child(id)
      .remove();
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
          keyExtractor={(item) => {
            item.id;
          }}
          data={this.state.reminderlist}
          renderItem={({ item }) => {
            return (
              <View style={styles.view}>
                <Text style={styles.text}>
                  {item.title} - {item.day}
                </Text>
                <TouchableOpacity
                  onPress={() => this.onDeleteReminder(item.id)}
                >
                  <Feather name="trash" size={20} color="black" />
                </TouchableOpacity>
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
  view: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 10,
    alignItems: "center",
  },
});

const mapStateToProps = (state) => {
  const { title, day } = state.reminder;
  return { title, day };
};
export default connect(mapStateToProps, { reminderUpdate, reminderCreate })(
  Reminder
);
