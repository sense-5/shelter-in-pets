import axios from 'axios';

//action type
const GET_USER = 'GET_USER';

//action creator
const getUser = user => ({ type: GET_USER, user });

//intial state
const defaultUser = {};

//login auth thunk
export const loginAuth = (email, password) => async dispatch => {
  try {
    const { data } = await axios.post('/auth/login', {
      email,
      password,
    });
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }
  try {
    dispatch(getUser(data));
  } catch (error) {
    console.error(error);
  }
};

//signup auth thunk

export const signupAuth = (email, password, zipcode) => async dispatch => {
  try {
    const { data } = await axios.post('/auth/signup', {
      email,
      password,
      zipcode,
    });
    console.log('data', data);
    dispatch(getUser(data));
  } catch (authError) {
    console.log('error', authError);
    return dispatch(getUser({ error: authError }));
  }
  // try {
  //   dispatch(getUser(data));
  // } catch (error) {
  //   console.error(error);
  // }
};

//user reducer
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    default:
      return state;
  }
}
