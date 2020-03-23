import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.dashboardWrapper}>
          <Text style={styles.userText}>Hey User</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
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
