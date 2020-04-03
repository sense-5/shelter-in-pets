import axios from 'axios';
import env from '../../environment';

//action type
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';

//action creator
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

//intial state
const defaultUser = {};

//get user thunk
export const getMe = () => async dispatch => {
  try {
    const { data } = await axios.get(`${env.apiUrl}/api/users`);
    dispatch(getUser(data));
  } catch (error) {
    console.log(error);
  }
};

//login auth thunk
export const loginAuth = (email, password, navigation) => async dispatch => {
  try {
    const { data } = await axios.post(`${env.apiUrl}/auth/login`, {
      email,
      password,
    });
    if (data.id) {
      dispatch(getUser(data));
      navigation.navigate('isLoggedIn');
    }
  } catch (authError) {
    alert('Invalid user credentials!');
  }
};

//signup auth thunk

export const signupAuth = (
  email,
  password,
  zipcode,
  navigation
) => async dispatch => {
  try {
    const { data } = await axios.post(`${env.apiUrl}/auth/signup`, {
      email,
      password,
      zipcode,
    });
    if (data.id) {
      dispatch(getUser(data));
      navigation.navigate('isLoggedIn');
    }
  } catch (authError) {
    alert('Oops. There was an error. Please try again.');
  }
};

//logout thunk
export const logout = () => async dispatch => {
  try {
    await axios.post(`${env.apiUrl}/auth/logout`);
    dispatch(removeUser());
  } catch (err) {
    console.error(err);
  }
};

//user reducer
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
}
