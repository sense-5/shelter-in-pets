import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { connect } from 'react-redux';
import { logout } from './client/store/user';
import { Text, View, Button } from 'react-native';
import ImagePick from './client/component/ImagePicker';
import Signup from './client/screens/signup';
import BreedOptions from './client/component/breedOptions';
import DogsByBreed from './client/component/dogsByBreed';
import { Ionicons } from '@expo/vector-icons';
import LikedDogs from './client/component/profile';
import ProfileDog from './client/component/ProfileSingleDog';
import Request from './client/component/requestForm';
import SearchResults from './client/component/searchResults'

import HomeScreen from './client/screens/home';

import Dog from './client/component/singleDog';

import Login from './client/screens/login';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function isLoggedIn({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === 'home') {
            iconName = 'ios-home';
          }
          if (route.name === 'upload') {
            iconName = 'md-photos';
          }
          if (route.name === 'favorites') {
            iconName = 'ios-paw';
          }

          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#147efb',
        inactiveTintColor: 'grey',
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        Screen={() => <HomeScreen navigation={navigation} />}
      />
      <Tab.Screen name="upload" component={ImagePick} />
      <Tab.Screen name="favorites" component={LikedDogs} />
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
                  color="#147efb"
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

          <Stack.Screen
            name="Profile Dog"
            component={ProfileDog}
            options={({ navigation }) => ({
              headerTitle: '',
            })}
          />

          <Stack.Screen
            name="Breed Options"
            component={BreedOptions}
            options={({ navigation }) => ({
              headerTitle: '',
            })}
          />

          <Stack.Screen
            name="Dogs By Breed"
            component={DogsByBreed}
            options={({ navigation }) => ({
              headerTitle: '',
            })}
          />

          <Stack.Screen
            name="Filtered Search"
            component={Request}
            options={({ navigation }) => ({
              headerTitle: '',
            })}
          />

          <Stack.Screen
            name="Search Results"
            component={SearchResults}
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
