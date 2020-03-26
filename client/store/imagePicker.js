
//initial state
const initialState = {
  pickedImage: ''
}

//action type
const GET_PICKED_IMAGE = 'GET_PICKED_IMAGE'

//action creator
export const getPickedImage = (pickedImage) => ({
  type: GET_PICKED_IMAGE,
  pickedImage
})

//reducer
const pickedImage = (state = initialState, action) => {
  switch (action.type){
    case GET_PICKED_IMAGE:
      return {
        ...state,
        pickedImage: action.pickedImage
      }
    default:
      return state
  }
}

export default pickedImage;
