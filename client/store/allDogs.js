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

// initial state
const initialState = {
  allDogs: [],
  selectedDog: {},
  dogsByBreed: [],
};

// action thunk
export const getAllDogs = page => {
  return async dispatch => {
    try {
      if (!page) {
        page = 1;
      }
      const { data } = await axios.get(
        // `https://shelter-in-pets-server.herokuapp.com/api/dogs/${page}`
        `http://localhost:3000/api/dogs/${page}`
      );
      let dogImages = getDogImages(data.animals);

      dispatch(gotAllDogs(dogImages));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getDogsByBreed = breed => {
  return async dispatch => {
    try {
      const { data } = await axios.get(
        // `https://shelter-in-pets-server.herokuapp.com/api/dogs/type/${breed}`
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
const dogs = (state = initialState, action) => {
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
