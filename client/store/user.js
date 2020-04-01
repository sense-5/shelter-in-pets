import axios from 'axios';

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
    const { data } = await axios.get(
      //'https://shelter-in-pets-server.herokuapp.com/api/users'
      'http://localhost:3000/api/users'
    );
    dispatch(getUser(data));
  } catch (error) {
    console.log(error);
  }
};

//login auth thunk
export const loginAuth = (email, password, navigation) => async dispatch => {
  try {
    const { data } = await axios.post(
      //'https://shelter-in-pets-server.herokuapp.com/auth/login',
      'http://localhost:3000/auth/login',
      {
        email,
        password
      }
    );
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
    const { data } = await axios.post(
      // 'https://shelter-in-pets-server.herokuapp.com/auth/signup',
      'http://localhost:3000/auth/signup',
      {
        email,
        password,
        zipcode
      }
    );
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
    await axios.post(
      // 'https://shelter-in-pets-server.herokuapp.com/auth/logout'
      'http://localhost:3000/auth/logout'
    );
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
