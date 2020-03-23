import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import ImagePick from './ImagePicker';
import Signup from './client/screens/signup';
import Icon from 'react-native-ionicons';
import HomeScreen from './client/screens/home';
import LoginScreen from './client/screens/login';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile</Text>
    </View>
  );
}

function isLoggedIn() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="pick" component={ImagePick} />
      <Tab.Screen name="profile" component={Profile} />
    </Tab.Navigator>
  );
}
function Root() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="screen">
        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="isLoggedIn"
          component={isLoggedIn}
          options={({ navigation }) => ({
            headerTitle: '',
            headerRight: () => (
              <Button
                onPress={() => {
                  navigation.navigate('login');
                }}
                title="Logout"
                color="#000000"
              />
            ),
          })}
        />
        <Stack.Screen
          name="signup"
          component={Signup}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Root;
