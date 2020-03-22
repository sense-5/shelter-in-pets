import React, { Component } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ImagePick from '../../ImagePicker';

const Tab = createBottomTabNavigator();
function Navigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="HOME" component={ImagePick} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
