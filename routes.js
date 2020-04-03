import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { connect } from 'react-redux';
import { logout } from './client/store/user';
import { Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getLikedDogs } from './client/store/likedDog';

import ImagePick from './client/component/ImagePicker';
import Signup from './client/screens/Signup';
import BreedOptions from './client/component/BreedOptions';
import DogsByBreed from './client/component/DogsByBreed';
import LikedDogs from './client/component/LikedDogs';
import Request from './client/component/RequestForm';
import SearchResults from './client/component/SearchResults';
import HomeScreen from './client/screens/Home';
import Recs from './client/screens/Recommendations';
import Dog from './client/component/SingleDog';
import Login from './client/screens/Login';
import ProfileDog from './client/component/ProfileSingleDog';

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
          if (route.name === 'recommendations') {
            iconName = 'ios-ribbon';
          }

          return <Ionicons name={iconName} size={24} color={color} />;
        }
      })}
      tabBarOptions={{
        activeTintColor: '#147efb',
        inactiveTintColor: 'grey'
      }}
    >
      <Tab.Screen
        name='home'
        component={HomeScreen}
        Screen={() => <HomeScreen navigation={navigation} />}
      />
      <Tab.Screen name='upload' component={ImagePick} />
      <Tab.Screen name='recommendations' component={Recs} />
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
        <Stack.Navigator headerMode='screen'>
          <Stack.Screen
            name='login'
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='isLoggedIn'
            component={isLoggedIn}
            options={({ navigation }) => ({
              headerTitle: '',

              headerLeft: () => (
                <Button
                  onPress={() => {
                    this.handleLogout();
                    navigation.navigate('login');
                  }}
                  title='Logout'
                  color='#147efb'
                />
              ),
              headerRight: () => (
                <Button
                  onPress={async () => {
                    await this.props.getLikedDogs();
                    navigation.navigate('favorites', this.props.allLikedDogs);
                  }}
                  title='Favorites'
                />
              )
            })}
          />
          <Stack.Screen
            name='signup'
            component={Signup}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Single Dog'
            component={Dog}
            options={({ navigation }) => ({
              headerTitle: '',
              headerRight: () => (
                <Button
                  onPress={async () => {
                    await this.props.getLikedDogs();
                    navigation.navigate('favorites', this.props.allLikedDogs);
                  }}
                  title='Favorites'
                />
              )
            })}
          />

          <Stack.Screen
            name='Profile Dog'
            component={ProfileDog}
            options={({ navigation }) => ({
              headerTitle: '',
              headerRight: () => (
                <Button
                  onPress={async () => {
                    await this.props.getLikedDogs();
                    navigation.navigate('favorites', this.props.allLikedDogs);
                  }}
                  title='Favorites'
                />
              )
            })}
          />

          <Stack.Screen
            name='Breed Options'
            component={BreedOptions}
            options={({ navigation }) => ({
              headerTitle: ''
            })}
          />

          <Stack.Screen
            name='Dogs By Breed'
            component={DogsByBreed}
            options={({ navigation }) => ({
              headerTitle: ''
            })}
          />

          <Stack.Screen
            name='Filtered Search'
            component={Request}
            options={({ navigation }) => ({
              headerTitle: ''
            })}
          />

          <Stack.Screen
            name='favorites'
            component={LikedDogs}
            options={({ navigation }) => ({
              headerTitle: ''
            })}
          />

          <Stack.Screen
            name='Search Results'
            component={SearchResults}
            options={({ navigation }) => ({
              headerTitle: ''
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
const mapStateToProps = state => {
  return {
    allLikedDogs: state.likedDogs,
    user: state.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(logout());
    },
    getLikedDogs: () => dispatch(getLikedDogs())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
