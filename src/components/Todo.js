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
  Dimensions,
  Modal,
} from "react-native";
import Header from "./Header";

import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const numColumns = 2;
const WIDTH = Dimensions.get("window").width;

class Todo extends Component {
  backgroundColors = [
    "#ffffff",
    "#5CD859",
    "#24A6D9",
    "#595BD9",
    "#8022D9",
    "#D159D8",
    "#59d8d0",
    "#D88559",
  ];
  state = { todolist: [], modalOpen: false, color: this.backgroundColors[0] };

  componentDidMount() {
    const previousTodos = this.state.todolist;
    const { currentUser } = firebase.auth();
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/todos`)
      .on("child_added", (snap) => {
        previousTodos.push({
          id: snap.key,
          message: snap.val().message,
        });
        this.setState({
          todolist: previousTodos,
        });
        firebase
          .database()
          .ref(`/users/${currentUser.uid}/todos`)
          .on("child_removed", (snap) => {
            for (var i = 0; i < previousTodos.length; i++) {
              if (previousTodos[i].id === snap.key) {
                previousTodos.splice(i, 1);
              }
            }
            this.setState({
              todolist: previousTodos,
            });
          });
      });
  }

  onDeleteTodo = (id) => {
    const { currentUser } = firebase.auth();
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/todos`)
      .child(id)
      .remove();
  };
  onTodoChange = (todo) => {
    this.props.changeMessage(todo);
  };

  _renderItem = ({ item }) => {
    return (
      <View style={styles.itemBlock}>
        <Text style={styles.itemText}>{item.message}</Text>
        <Ionicons
          name="color-palette-outline"
          size={24}
          color="black"
          onPress={() => {
            this.setState({ modalOpen: true });
          }}
        />
        <TouchableOpacity onPress={() => this.onDeleteTodo(item.id)}>
          <Feather name="trash" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  };
  renderColors() {
    return this.backgroundColors.map((color) => {
      return (
        <TouchableOpacity
          key={color}
          style={[styles.colorSelect, { backgroundColor: color }]}
          onPress={() => {
            this.setState({ color });
          }}
        />
      );
    });
  }
  render() {
    return (
      <View>
        <Header title={"Todo"} />
        <View style={styles.container}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalOpen}
          >
            <View style={{ backgroundColor: "000000aa", width: 350 }}>
              <View
                style={{
                  backgroundColor: "#ffffff",
                  marginTop: 160,
                  marginRight: 20,
                  padding: 40,
                  borderRadius: 10,
                }}
              >
                <Feather
                  name="x"
                  size={24}
                  color="black"
                  onPress={() => {
                    this.setState({ modalOpen: false });
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 12,
                  }}
                >
                  {this.renderColors()}
                </View>
              </View>
            </View>
          </Modal>

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
            keyExtractor={(item) => {
              item.id;
            }}
            data={this.state.todolist}
            renderItem={this._renderItem}
            numColumns={numColumns}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  input: {
    height: 45,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    marginBottom: 10,
    fontSize: 18,
  },

  container: {
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  itemBlock: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderWidth: 1,
    borderColor: "#F0F0F0",
    marginTop: 10,
    flex: 1,
    margin: 1,
    height: WIDTH / numColumns,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 15,
  },
  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
});
const mapStateToProps = (state) => {
  return {
    todos: state.main.todos,
    todo: state.main.todo,
    color: state.main.color,
  };
};
export default connect(mapStateToProps, {
  addTodo,
  changeMessage,
  todoUpload,
})(Todo);
