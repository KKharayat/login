import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class Header extends Component {
  render() {
    const { title, icon } = this.props;
    return (
      <View style={styles.header}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 25, color: "#505050" }}>{title}</Text>
          <Text
            style={{
              marginHorizontal: 10,
              alignSelf: "center",
            }}
          >
            {icon}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    marginTop: 20,
    backgroundColor: "#f9fafd",
    shadowColor: "#f9fafd",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
});
export default Header;
