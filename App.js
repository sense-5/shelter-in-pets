import 'react-native-gesture-handler'
import * as React from 'react';

import {View, Text} from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ImagePick from './ImagePicker';

const Tab = createBottomTabNavigator();

function Home(){
  return(
    <View style={{flex: 1, justifyContent: 'center', alignItems: "center"}}>
      <Text>home</Text>
    </View>
  )
}

function Profile(){
  return(
    <View style={{flex: 1, justifyContent: 'center', alignItems: "center"}}>
      <Text>Profile</Text>
    </View>
  )
}

export default function App() {
    return (
    <NavigationContainer>
      <Tab.Navigator>
        {console.log('in navigator')}
        <Tab.Screen name="home" component={Home} />
        <Tab.Screen name="pick" component={ImagePick} />
        <Tab.Screen name="profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>

    );
}

