import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default class DashboardScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.dashboardWrapper}>
          <Text style={styles.userText}>Hey User</Text>
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={() => this.props.navigation.navigate("Auth")}
          >
            <Text style={styles.logoutBtnText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  dashboardWrapper: {
    textAlign: "center"
  },
  userText: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10
  },
  logoutBtn: {
    backgroundColor: "blue",
    paddingVertical: 10,
    width: 100,
    alignSelf: "center"
  },
  logoutBtnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold"
  }
});
