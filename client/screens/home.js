import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { connect } from 'react-redux';
import Dogs from '../component/allDogs';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View>
        {/* <View style={styles.dashboardWrapper}> */}
        {/* <Text style={styles.userText}>Hey User</Text> */}
        <Dogs navigation={this.props.navigation} />

        {/* </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
  },
  dashboardWrapper: {
    textAlign: 'center',
  },
  userText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    width: 100,
    alignSelf: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
