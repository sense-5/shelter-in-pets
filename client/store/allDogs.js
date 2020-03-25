import axios from 'axios';

// action type
const GET_ALL_DOGS = 'GET_ALL_DOGS';

// action creator
const gotAllDogs = allDogs => ({ type: GET_ALL_DOGS, allDogs });

// inital state
const initalState = {
  allDogs: [],
  selectedDog: {},
};

// action thunk
export const getAllDogs = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get(
        // 'https://shelter-in-pets-server.herokuapp.com/api/dogs'
        'http://localhost:3000/api/dogs'
      );
      console.log('in data:', data);
      dispatch(gotAllDogs(data.animals));
    } catch (error) {
      console.error(error);
    }
  };
};

// Reducer
const dogs = (state = initalState, action) => {
  switch (action.type) {
    case GET_ALL_DOGS:
      return { ...state, allDogs: action.allDogs };
    default:
      return state;
  }
};

export default dogs;
