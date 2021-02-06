import React, { Component } from "react";
import firebase from "firebase";
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  FlatList,
  Text,
} from "react-native";
import { notesUpdate, noteCreate, notesFetch } from "../actions/MainNotes";
import { connect } from "react-redux";

class Notes extends Component {
  state = { datalist: [] };
  componentDidMount() {
    // this.props.notesFetch();
    const { currentUser } = firebase.auth();
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/notes`)
      .on("value", (snapshot) => {
        let datalist = [];
        snapshot.forEach((snap) => {
          datalist.push(snap.val());
        });
        this.setState({ datalist: datalist });
      });
    console.log(this.state.datalist);
  }

  onButtonPress = () => {
    const { title, body } = this.props;
    this.props.noteCreate({ title, body });
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
          data={this.state.datalist}
          renderItem={({ item }) => {
            return (
              <View>
                <Text style={styles.text}>
                  {item.title} - {item.body}
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
