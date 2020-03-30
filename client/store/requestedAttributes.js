import axios from 'axios'

const initialState = {
  attributes: {},
  requestedDogs: []
}

//action constant
const GOT_REQUESTED_DOGS = 'GOT_REQUESTED_DOGS'

//action creator
export const gotRequestedDogs = dogs => ({
  type: GOT_REQUESTED_DOGS,
  dogs
})

//THUNK
  //will accept attributes from state in an obj as param to send
export const fetchRequestedDogs = (fakeState = {age: [''], size: ['small','medium'], coat: ['long']}) => {
  return async dispatch => {
    console.log('hello u hit the GET requested dogs thunk')
    try {
      const age = fakeState.age.length > 1
        ? fakeState.age.join(',')
        : fakeState.age[0]
      const size = fakeState.size.length > 1
        ? fakeState.size.join(',')
        : fakeState.size[0]
      const coat = fakeState.coat.length > 1
        ? fakeState.join(',')
        : fakeState.coat[0]
    //if any of these is empty query will still work giving all possibilities for that category

      const {data} = await axios.get('http://localhost:3000/api/dogs/request', {
        params: {
          age,
          size,
          coat
        }
      })
      dispatch(gotRequestedDogs(data))
      console.log('this is the end thank u check the server console')
    } catch (error) {
      console.error(error)
    }
  }
}



//action reducer
const requestedAttributes = (state = initialState, action) => {
  switch (action.type){
    case GOT_REQUESTED_DOGS:
      return {
        ...state,
        requestedDogs: action.dogs
      }
    default:
      return state;
  }
}

export default requestedAttributes
