import axios from 'axios';
import { getDogImages } from '../../utility/prediction';

//action types
const GET_REC_DOGS = 'GET_REC_DOGS';
const GET_DEFAULT_DOGS = 'GET_DEFAULT_DOGS';

//action creators
const gotRecDogs = dogs => ({ type: GET_REC_DOGS, dogs });
const gotDefaultDogs = dogs => ({ type: GET_DEFAULT_DOGS, dogs });

//action thunk
export const getRecDogs = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('http://localhost:3000/api/recs');
      console.log('this is in recDogs thunk: ', data);
      if (data.default) {
        let defaultDogs = getDogImages(data.default.animals);
        dispatch(gotDefaultDogs(defaultDogs));
      } else {
        let recDogs = getDogImages(data.animals);
        dispatch(gotRecDogs(recDogs));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

//default state
const initialState = {
  recDogs: [],
  defaultDogs: []
};

//reducer
const recDogs = (state = initialState, action) => {
  switch (action.type) {
    case GET_REC_DOGS:
      return {
        ...state,
        recDogs: action.dogs
      };
    case GET_DEFAULT_DOGS:
      return {
        ...state,
        defaultDogs: action.dogs
      };
    default:
      return state;
  }
};

export default recDogs;
