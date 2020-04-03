import axios from 'axios';
import env from '../../environment';

//initial state
const initialState = {
  pickedImage: '',
  breeds: [],
};

//action type
const GET_PICKED_IMAGE = 'GET_PICKED_IMAGE';
const GET_BREEDS = 'GET_BREEDS';

//action creator
export const getPickedImage = pickedImage => ({
  type: GET_PICKED_IMAGE,
  pickedImage,
});

export const getBreeds = breeds => ({
  type: GET_BREEDS,
  breeds,
});

//thunk to get all dog breeds
export const getAllBreeds = () => async dispatch => {
  try {
    let { data } = await axios.get(`${env.apiUrl}/api/dogs/breeds`);
    data = data.map(breed => {
      return (breed.name = breed.name.toLowerCase());
    });

    dispatch(getBreeds(data));
  } catch (error) {
    console.log(error);
  }
};

//reducer
const pickedImage = (state = initialState, action) => {
  switch (action.type) {
    case GET_PICKED_IMAGE:
      return {
        ...state,
        pickedImage: action.pickedImage,
      };
    case GET_BREEDS:
      return {
        ...state,
        breeds: action.breeds,
      };

    default:
      return state;
  }
};

export default pickedImage;
