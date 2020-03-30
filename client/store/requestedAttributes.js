import axios from 'axios'
import { ActionSheetIOS } from 'react-native'

const initialState = {
  attributes: {},
  requestedDogs: []
}

//action constant
const FETCH_REQUESTED_DOGS = 'FETCH_REQUESTED_DOGS'
const GOT_REQUESTED_DOGS = 'GOT_REQUESTED_DOGS'

//action creator
export const gotRequestedDogs = dogs => ({
  type: GET_REQUESTED_DOGS,
  dogs
})

//THUNK
  //will accept attributes from state in an obj as param to send
export const getRequestedDogs = (fakeState = {age: '', size: ['small','medium'], coat: 'long'}) => {
  return async dispatch => {
    console.log('hello u hit the GET requested dogs thunk')
    try {

      const age = Array.isArray(fakeState.age)
        ? fakeState.age.join(',')
        : fakeState.age
      const size = Array.isArray(fakeState.size)
        ? fakeState.size.join(',')
        : fakeState.size
      const coat = Array.isArray(fakeState.coat)
        ? fakeState.join(',')
        : fakeState.coat
    //if any of these is empty query will still work giving all possibilities for that category

      const {data} = await axios.get('http://localhost:3000/api/dogs/request', {
        params: {
          age,
          size,
          coat
        }
      })


      // console.log(data)
      // dispatch(gotRequestedDogs(data))
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
