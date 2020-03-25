import React,  {Component} from 'react'
import {View, Text, Image, Button, StyleSheet} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import {connect} from 'react-redux';
import {getPickedImage} from './client/store/imagePicker'

class ImagePick extends Component {
  constructor(){
    super()
    // this.state = {
    //   pickedUri: ''
    // }
    this.openImagePicker = this.openImagePicker.bind(this)
  }

  async openImagePicker(){
    let pickerResult = await ImagePicker.launchImageLibraryAsync()

    // this.setState({
    //   pickedUri: pickerResult.uri
    // })
    this.props.getPickedImage(pickerResult)
  }

  render(){
    console.log('picked image', this.props.pickedImage.pickedImage)

    return(
      <View style={styles.container}>
        {
        this.props.pickedImage.pickedImage ? (
          <View>
          <Text>chosen dog</Text>
          <Image style={styles.image} source={{uri: this.props.pickedImage.pickedImage}}/>
          </View>
        ) : (
          <Text>choose a photo</Text>
        )
        }

        <Button title="Choose photo" onPress={this.openImagePicker}/>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: 250,
    width: 250
  }
})

const mapState = state => ({
  pickedImage: state.pickedImage
})

const mapDispatch = dispatch => ({
  getPickedImage: (img) => dispatch(getPickedImage(img.uri))
})

export default connect(mapState,mapDispatch)(ImagePick)
