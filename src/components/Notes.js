import React, { Component } from "react";
import firebase from "firebase";
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { notesUpdate, noteCreate, notesFetch } from "../actions/MainNotes";
import { connect } from "react-redux";
import { Feather } from "@expo/vector-icons";

class Notes extends Component {
  state = { datalist: [] };

  componentDidMount() {
    const previousNotes = this.state.datalist;
    const { currentUser } = firebase.auth();
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/notes`)
      .on("child_added", (snap) => {
        previousNotes.push({
          id: snap.key,
          title: snap.val().title,
          body: snap.val().body,
        });
        this.setState({ datalist: previousNotes });
        firebase
          .database()
          .ref(`/users/${currentUser.uid}/notes`)
          .on("child_removed", (snap) => {
            for (var i = 0; i < previousNotes.length; i++) {
              if (previousNotes[i].id === snap.key) {
                previousNotes.splice(i, 1);
              }
            }
            this.setState({
              datalist: previousNotes,
            });
          });
      });

    console.log(this.state.datalist);
  }

  onButtonPress = () => {
    const { title, body } = this.props;
    this.props.noteCreate({ title, body });
  };

  onDeleteNotes = (id) => {
    const { currentUser } = firebase.auth();
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/notes`)
      .child(id)
      .remove();
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={this.props.title}
          onChangeText={(text) => {
            this.props.notesUpdate({ prop: "title", value: text });
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Body"
          value={this.props.body}
          onChangeText={(text) => {
            this.props.notesUpdate({ prop: "body", value: text });
          }}
        />
        <Button
          title="Submit"
          style={{ marginVertical: 20 }}
          onPress={this.onButtonPress}
        />
        <FlatList
          keyExtractor={(item) => {
            item.id;
          }}
          data={this.state.datalist}
          renderItem={({ item }) => {
            return (
              <View style={styles.view}>
                <Text style={styles.text}>
                  {item.title} - {item.body}
                </Text>

                <TouchableOpacity onPress={() => this.onDeleteNotes(item.id)}>
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
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginHorizontal: 20,
    fontSize: 20,
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
  const { title, body } = state.notes;
  return { title, body };
};
export default connect(mapStateToProps, {
  notesUpdate,
  noteCreate,
  notesFetch,
})(Notes);
