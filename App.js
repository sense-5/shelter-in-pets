import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Signup from './client/screens/signup';
import { Provider } from 'react-redux';
import store from './client/store';
import 'react-native-gesture-handler';
import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ImagePick from './ImagePicker';

const Tab = createBottomTabNavigator();

function Home() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>home</Text>
    </View>
  );
}

function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile</Text>
    </View>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="home" component={Home} />
          <Tab.Screen name="pick" component={ImagePick} />
          <Tab.Screen name="profile" component={Profile} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
