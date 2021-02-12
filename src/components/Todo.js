import React, { Component } from "react";
import { connect } from "react-redux";
import {
  todoUpdate,
  todoUpload,
  todosFetch,
  deleteTodos,
} from "../actions/MainNotes";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import Header from "./Header";
import firebase from "firebase";

import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { windowWidth, windowHeight } from "./FormButtons/Dimensions";
const numColumns = 2;

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
          title: snap.val().title,
          color: snap.val().color,
          timestamp: snap.timestamp,
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
    // console.log(this.state.todolist);
  }

  onButtonPress = () => {
    const { title, color } = this.props;
    this.props.todoUpload({ title, color });
  };
  onDeleteTodo = (id) => {
    const { currentUser } = firebase.auth();
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/todos`)
      .child(id)
      .remove();
  };
  _renderItem = ({ item }) => {
    return (
      <View style={[styles.itemBlock]}>
        <Text style={styles.itemText}>{item.title}</Text>
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
  renderColors = () => {
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
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
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

          <FlatList
            keyExtractor={(item) => {
              item.id;
            }}
            data={this.state.todolist}
            renderItem={this._renderItem}
            numColumns={numColumns}
          />
        </View>

        <View
          style={{
            flex: 1,
            width: "100%",
            flexDirection: "row",
            marginBottom: 10,
            paddingHorizontal: 10,
            position: "absolute",
            bottom: 0,
          }}
        >
          <TextInput
            value={this.props.title}
            onChangeText={(text) => {
              this.props.todoUpdate({ prop: "title", value: text });
            }}
            placeholder="Add Todos"
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.btn}
            title="Add"
            onPress={this.onButtonPress}
          >
            <AntDesign name="plus" size={24} color="#C8C8C8" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  input: {
    height: 45,
    marginHorizontal: 10,
    width: "80%",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    fontSize: 18,
  },
  btn: {
    padding: 5,
    fontSize: 8,
    borderWidth: 1,
    borderColor: "#ccc",

    height: windowHeight / 15,
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
    height: windowWidth / numColumns,
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
  const { title, color, todos } = state.main;
  console.log(todos);
  return { title, color, todos };
};
export default connect(mapStateToProps, {
  todoUpdate,
  todoUpload,
  todosFetch,
  deleteTodos,
})(Todo);
