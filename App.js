import 'react-native-gesture-handler'
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ImagePick from './ImagePicker';

const Tab = createBottomTabNavigator();

export default function App() {
    return (
    <NavigationContainer>
      <Tab.Navigator>
        {console.log('in navigator')}
        <Tab.Screen name="pick" component={ImagePick} />
      </Tab.Navigator>
    </NavigationContainer>

    );
}

