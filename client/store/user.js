import axios from 'axios';

//action type
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';

//action creator
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

//intial state
const defaultUser = {};

//login auth thunk
export const loginAuth = (email, password) => async dispatch => {
  try {
    const { data } = await axios.post(
      'https://shelter-in-pets-server.herokuapp.com/auth/login',
      {
        email,
        password,
      }
    );
    dispatch(getUser(data));
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }
};

//signup auth thunk

export const signupAuth = (email, password, zipcode) => async dispatch => {
  try {
    const { data } = await axios.post(
      'https://shelter-in-pets-server.herokuapp.com/auth/signup',
      {
        email,
        password,
        zipcode,
      }
    );
    dispatch(getUser(data));
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }
};

//logout thunk
export const logout = () => async dispatch => {
  try {
    await axios.post(
      'https://shelter-in-pets-server.herokuapp.com/auth/logout'
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
