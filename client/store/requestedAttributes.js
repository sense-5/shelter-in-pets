import axios from 'axios';
import env from '../../environment';
import { getDogImages } from '../../utility/prediction';

const initialState = {
  attributes: {},
  requestedDogs: [],
};

//action constant
const GOT_REQUESTED_DOGS = 'GOT_REQUESTED_DOGS';

//action creator
export const gotRequestedDogs = dogs => ({
  type: GOT_REQUESTED_DOGS,
  dogs,
});

//THUNK
export const fetchRequestedDogs = req => {
  return async dispatch => {
    try {
      const age = req.age.length > 1 ? req.age.join(',') : req.age[0];
      const size = req.size.length > 1 ? req.size.join(',') : req.size[0];
      const coat = req.coat.length > 1 ? req.coat.join(',') : req.coat[0];
      //if any of these is empty query will still work giving all possibilities for that category

      const { data } = await axios.get(`${env.apiUrl}/api/dogs/request`, {
        params: {
          age,
          size,
          coat,
        },
      });
      let dogImages = getDogImages(data.animals);
      dispatch(gotRequestedDogs(dogImages));
    } catch (error) {
      console.error(error);
    }
  };
};

//action reducer
const requestedAttributes = (state = initialState, action) => {
  switch (action.type) {
    case GOT_REQUESTED_DOGS:
      return {
        ...state,
        requestedDogs: action.dogs,
      };
    default:
      return state;
  }
};

export default requestedAttributes;
