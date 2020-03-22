import 'react-native-gesture-handler'
import * as React from 'react';

import {View, Text} from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'

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
            <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color}) => {
            let iconName;

            if (route.name === 'home') {
              iconName = 'ios-home';
            }
            if (route.name === 'upload') {
              iconName = 'md-photos';
            }
            if (route.name === 'profile'){
              iconName = 'ios-happy'
            }

            return <Ionicons name={iconName} size={24} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="home" component={Home} />
        <Tab.Screen name="upload" component={ImagePick} />
        <Tab.Screen name="profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>

    );
}

