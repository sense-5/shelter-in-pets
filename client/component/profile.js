import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { connect } from "react-redux";

import { getMe } from "../store/user";

class Profile extends React.Component {
  constructor() {
    super();
  }
  //user information is loaded in homescreen and can be accessed through this.props.user
  componentDidMount() {
    this.props.getMe();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.user}>User ID: {this.props.user.id}</Text>
        <Text style={styles.user}>User Email: {this.props.user.email}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  user: {
    fontSize: 22,
    textAlign: "center",
    marginTop: 20
  }
});

const mapState = state => {
  return {
    user: state.user
  };
};

const mapDispatch = dispatch => {
  return {
    getMe: () => dispatch(getMe())
  };
};

export default connect(mapState, mapDispatch)(Profile);
