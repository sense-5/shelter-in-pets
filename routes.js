import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { connect } from 'react-redux';
import { logout } from './client/store/user';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import ImagePick from './ImagePicker';
import Signup from './client/screens/signup';
// import Icon from 'react-native-ionicons';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './client/screens/home';

import Dog from './client/component/singleDog';

import Login from './client/screens/login';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile</Text>
    </View>
  );
}

function isLoggedIn({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === 'home') {
            iconName = 'ios-paw';
          }
          if (route.name === 'upload') {
            iconName = 'md-photos';
          }
          if (route.name === 'profile') {
            iconName = 'ios-happy';
          }

          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        Screen={() => <HomeScreen navigation={navigation} />}
      />
      <Tab.Screen name="upload" component={ImagePick} />
      <Tab.Screen name="profile" component={Profile} />
    </Tab.Navigator>
  );
}

class Root extends React.Component {
  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(navigation) {
    this.props.logout();
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode="screen">
          <Stack.Screen
            name="login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="isLoggedIn"
            component={isLoggedIn}
            options={({ navigation }) => ({
              headerTitle: '',

              headerLeft: () => (
                <Button
                  onPress={() => {
                    this.handleLogout();
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
          <Stack.Screen
            name="Single Dog"
            component={Dog}
            options={({ navigation }) => ({
              headerTitle: '',
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
