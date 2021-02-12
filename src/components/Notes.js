import React, { Component } from "react";
import { windowHeight, windowWidth } from "./FormButtons/Dimensions";
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  notesUpdate,
  noteCreate,
  notesFetch,
  deleteNotes,
} from "../actions/MainNotes";
import { connect } from "react-redux";
import { Feather } from "@expo/vector-icons";
import Header from "./Header";

class Notes extends Component {
  state = { datalist: [] };

  componentDidMount() {
    this.props.notesFetch();
  }

  onButtonPress = () => {
    const { title, body } = this.props;
    this.props.noteCreate({ title, body });
  };

  onDeleteNotes = (id) => {
    this.props.deleteNotes(id);
  };

  render() {
    return (
      <View>
        <Header title={"Notes"} />
        <View>
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
            data={this.props.notes}
            renderItem={({ item }) => {
              // console.log(item);
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

    alignItems: "center",
    flex: 1,
    marginTop: 5,
    marginBottom: 10,
    width: "100%",
    height: windowHeight / 15,
    borderColor: "#ccc",
    borderRadius: 3,
    borderWidth: 1,

    alignItems: "center",
    backgroundColor: "#fff",
  },
});

const mapStateToProps = (state) => {
  const { title, body, notes } = state.notes;
  // console.log(notes);
  return { title, body, notes };
};
export default connect(mapStateToProps, {
  notesUpdate,
  noteCreate,
  notesFetch,
  deleteNotes,
})(Notes);
