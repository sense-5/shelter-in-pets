import axios from 'axios';

const LIKE_DOG = 'LIKE_DOG';
const GET_LIKED_DOGS = 'GET_LIKED_DOGS';

const LikedDog = status => ({ type: LIKE_DOG, status });
const gotLikedDogs = dogs => ({ type: GET_LIKED_DOGS, dogs });

export const likeDog = dog => async dispatch => {
  try {
    const { data } = await axios.post(
      'http://localhost:3000/api/likedDog',
      //   'https://shelter-in-pets-server.herokuapp.com/api/likedDogs',
      {
        petFinderId: dog.id,
        breed: dog.breeds.primary
      }
    );

    dispatch(LikedDog(data.liked));
  } catch (error) {
    console.error(error);
  }
};

export const getLikedDogs = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get(
        'http://localhost:3000/api/likedDog/'
        //'https://shelter-in-pets-server.herokuapp.com/api/likedDog/'
      );

      dispatch(gotLikedDogs(data));
    } catch (error) {
      console.error(error);
    }
  };
};



const initialState = {
  allLikedDogs: [],
  likedStatus: null
};

const likedDogs = (state = initialState, action) => {
  switch (action.type) {
    case LIKE_DOG:
      return {
        ...state,
        likedStatus: action.status
      };
    case GET_LIKED_DOGS:
      return { ...state, allLikedDogs: action.dogs };
    default:
      return state;
  }
};

export default likedDogs;
