import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";

export default class LoginScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formWrapper}>
          <Text style={styles.welcomeText}>Welcome back user</Text>
          <View style={styles.formRow}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter email address"
              placeholderTextColor="#333"
            />
          </View>
          <View style={styles.formRow}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter password"
              placeholderTextColor="#333"
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity style={styles.signinBtn}>
            <Text style={styles.signinText}>Sign In</Text>
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
  formWrapper: {
    width: "80%"
  },
  formRow: {
    marginBottom: 10,
    textAlign: "center"
  },
  textInput: {
    backgroundColor: "#ddd",
    height: 40,
    paddingHorizontal: 10,
    color: "#333"
  },
  welcomeText: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "bold"
  },
  signinBtn: {
    backgroundColor: "blue",
    paddingVertical: 10
  },
  signinText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  }
});
