import React,  {Component} from 'react'
import {View, Text, Image, Button, StyleSheet} from 'react-native'
import * as ImagePicker from 'expo-image-picker';

class ImagePick extends Component {
  constructor(){
    super()
    this.state = {
      pickedUri: ''
    }
    this.openImagePicker = this.openImagePicker.bind(this)
  }

  async openImagePicker(){
    let pickerResult = await ImagePicker.launchImageLibraryAsync()

    this.setState({
      pickedUri: pickerResult.uri
    })
  }

  render(){
    console.log('image picker')
    return(
      <View style={styles.container}>
        {console.log('in return')}
        {
        this.state.pickedUri ? (
          <View>
          <Text>chosen dog</Text>
          <Image style={styles.image} source={{uri: this.state.pickedUri}}/>
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


export default ImagePick
