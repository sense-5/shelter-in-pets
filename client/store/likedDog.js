import axios from 'axios';

const UPLOAD_LIKED_DOG = 'UPLOAD_LIKED_DOG';

const uploadedLikedDog = status => ({ type: UPLOAD_LIKED_DOG, status });

export const likedDog = dog => async dispatch => {
  try {
    const { data } = await axios.post(
      'http://localhost:3000/api/likedDog',
      //   'https://shelter-in-pets-server.herokuapp.com/api/likedDogs',
      {
        petFinderId: dog.id,
        breed: dog.breeds.primary,
      }
    );

    dispatch(uploadedLikedDog(data.liked));
  } catch (error) {
    console.error(error);
  }
};

const initialState = {
  likedStatus: null,
};

const dog = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_LIKED_DOG:
      return {
        likedStatus: action.status,
      };

    default:
      return state;
  }
};

export default dog;
