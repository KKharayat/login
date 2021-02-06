import React, { Component } from "react";
import { connect } from "react-redux";
import firebase from "firebase";
import { addTodo, changeMessage, todoUpload } from "../actions/MainNotes";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";

class Todo extends Component {
  state = { todolist: [] };
  componentDidMount() {
    const { currentUser } = firebase.auth();
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/todos`)
      .on("value", (snapshot) => {
        let todolist = [];
        snapshot.forEach((snap) => {
          todolist.push(snap.val());
        });
        this.setState({ todolist: todolist });
      });
    console.log(this.state.todolist);
  }
  onDeleteTodo = () => {
    const { currentUser } = firebase.auth();
    firebase.database().ref(`/users/${currentUser.uid}/todos`).remove();
  };
  onTodoChange = (todo) => {
    this.props.changeMessage(todo);
  };
  render() {
    return (
      <View>
        <TextInput
          value={this.props.todo}
          onChangeText={this.onTodoChange}
          placeholder="Add Todos"
          style={styles.input}
        />

        <Button
          title="Add"
          onPress={() => {
            this.props.addTodo(this.props.todo);
            this.props.todoUpload(this.props.todo);
          }}
        />
        <FlatList
          data={this.state.todolist}
          renderItem={({ item }) => {
            console.log(item);
            return (
              <View style={styles.view}>
                <Text style={{ fontSize: 14, marginBottom: 10 }}>{item}</Text>
                <TouchableOpacity onPress={() => this.onDeleteTodo()}>
                  <Feather name="trash" size={24} color="black" />
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
  view: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  input: {
    height: 45,
    marginHorizontal: 10,

    borderBottomWidth: 1,
    marginBottom: 10,
    fontSize: 18,
  },
});
const mapStateToProps = (state) => {
  return {
    todos: state.main.todos,
    todo: state.main.todo,
  };
};
export default connect(mapStateToProps, {
  addTodo,
  changeMessage,
  todoUpload,
})(Todo);
