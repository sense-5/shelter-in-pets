import React from 'react';
import { View, StyleSheet } from 'react-native';
import Dogs from '../component/allDogs';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View>
        <Dogs navigation={this.props.navigation} />
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
