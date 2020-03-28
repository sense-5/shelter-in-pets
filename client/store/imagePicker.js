import Axios from 'axios';

//initial state
const initialState = {
  pickedImage: '',
  key: '',
};

//action type
const GET_PICKED_IMAGE = 'GET_PICKED_IMAGE';
const GET_KEY = 'GET_KEY';

//action creator
export const getPickedImage = pickedImage => ({
  type: GET_PICKED_IMAGE,
  pickedImage,
});

export const getKey = key => ({
  type: GET_KEY,
  key,
});

//reducer
const pickedImage = (state = initialState, action) => {
  switch (action.type) {
    case GET_PICKED_IMAGE:
      return {
        ...state,
        pickedImage: action.pickedImage,
      };
    case GET_KEY:
      return {
        ...state,
        key: action.key,
      };
    default:
      return state;
  }
};

export default pickedImage;
