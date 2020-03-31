import axios from 'axios';
import { getDogImages } from '../../utility/prediction';

// action type
const GET_ALL_DOGS = 'GET_ALL_DOGS';
const GET_BY_BREED = 'GET_BY_BREED';

// action creator
const gotAllDogs = allDogs => ({ type: GET_ALL_DOGS, allDogs });

const getByBreed = dogs => ({
  type: GET_BY_BREED,
  dogs,
});

// inital state
const initalState = {
  allDogs: [],
  selectedDog: {},
  dogsByBreed: [],
};

// action thunk
export const getAllDogs = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get(
        // 'https://shelter-in-pets-server.herokuapp.com/api/dogs'
        'http://localhost:3000/api/dogs'
      );
      dispatch(gotAllDogs(data.animals));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getDogsByBreed = breed => {
  return async dispatch => {
    try {
      const { data } = await axios.get(
        // `https://shelter-in-pets-server.herokuapp.com/api/dogs/type/${breed}`,
        `http://localhost:3000/api/dogs/type/${breed}`
      );

      let dogImages = getDogImages(data.animals);
      dispatch(getByBreed(dogImages));
    } catch (error) {
      console.log(error);
    }
  };
};

// Reducer
const dogs = (state = initalState, action) => {
  switch (action.type) {
    case GET_ALL_DOGS:
      return { ...state, allDogs: action.allDogs };
    case GET_BY_BREED:
      return { ...state, dogsByBreed: action.dogs };
    default:
      return state;
  }
};

export default dogs;
