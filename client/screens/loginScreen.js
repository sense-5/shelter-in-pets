import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";

export default class LoginScreen extends React.Component {
  state = {
    email: "",
    password: ""
  };

  onChangeHandle(state, value) {
    this.setState({
      [state]: value
    });
  }

  //???

  render() {
    const { email, password } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.formWrapper}>
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <View style={styles.formRow}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter email address"
              placeholderTextColor="#333"
              value={email}
              onChangeText={value => this.onChangeHandle("email", value)}
            />
          </View>
          <View style={styles.formRow}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter password"
              placeholderTextColor="#333"
              secureTextEntry={true}
              value={password}
              onChangeText={value => this.onChangeHandle("password", value)}
            />
          </View>
          <TouchableOpacity
            style={styles.signinBtn}
            onPress={() => this.props.navigation.navigate("App")}
          >
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
    marginBottom: 10
  },
  textInput: {
    backgroundColor: "#ddd",
    height: 40,
    paddingHorizontal: 10,
    color: "#333"
  },
  welcomeText: {
    textAlign: "center",
    marginBottom: 30,
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
