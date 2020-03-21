import axios from "axios";

//action type
const GET_USER = "GET_USER";

//action creator
const getUser = user => ({ type: GET_USER, user });

//intial state
const defaultUser = {};

//auth thunk
export const auth = (email, password, method) => async dispatch => {
  let res;
  try {
    res = await axios.post(`/auth/${method}`, { email, password });
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }
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
