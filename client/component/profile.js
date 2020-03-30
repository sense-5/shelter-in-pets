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
        <Text>userid: {this.props.user.id}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
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
