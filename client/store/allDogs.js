import axios from 'axios';
import { getDogImages } from '../../utility/prediction';

// action type
const GET_ALL_DOGS = 'GET_ALL_DOGS';
<<<<<<< HEAD
const GET_DOGS_BY_BREED = 'GET_DOGS_BY_BREED';
=======
const GET_BY_BREED = 'GET_BY_BREED';
>>>>>>> 73c388a99444c8bf2294b4a111cd22a1855870b1

// action creator
const gotAllDogs = allDogs => ({ type: GET_ALL_DOGS, allDogs });

<<<<<<< HEAD
const gotDogsbyBreed = dogs => ({ type: GET_DOGS_BY_BREED, dogs });
=======
const getByBreed = dogs => ({
  type: GET_BY_BREED,
  dogs,
});
>>>>>>> 73c388a99444c8bf2294b4a111cd22a1855870b1

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

<<<<<<< HEAD
export const getDogsByBreed = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get(
        // 'https://shelter-in-pets-server.herokuapp.com/api/dogs'
        'http://localhost:3000/api/dogs/:breed'
      );
      console.log('in data:', data);
      dispatch(gotDogsbyBreed(data.animals));
    } catch (error) {
      console.error(error);
=======
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
>>>>>>> 73c388a99444c8bf2294b4a111cd22a1855870b1
    }
  };
};

// Reducer
const dogs = (state = initalState, action) => {
  switch (action.type) {
    case GET_ALL_DOGS:
      return { ...state, allDogs: action.allDogs };
<<<<<<< HEAD
    case GET_DOGS_BY_BREED:
=======
    case GET_BY_BREED:
>>>>>>> 73c388a99444c8bf2294b4a111cd22a1855870b1
      return { ...state, dogsByBreed: action.dogs };
    default:
      return state;
  }
};

export default dogs;
