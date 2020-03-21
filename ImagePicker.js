import React,  {Component} from 'react'
import {View, Text, Image, Button, StyleSheet} from 'react-native'
import * as ImagePicker from 'expo-image-picker';

class ImagePick extends Component {
  constructor(){
    super()
    this.state = {
      pickedUri: ''
    }
  }

  async openImagePicker(){
    let pickerResult = await ImagePicker.launchImageLibraryAsync()

    this.setState({
      pickedUri: pickerResult.uri
    })
  }

  render(){
    return(
      <View style={styles.container}>

        <Text>chosen image:</Text>
        <Image style={styles.image} source={{uri: this.state.pickedUri}}/>

        <Button title="Choose photo" onPress={()=>{
          console.log('pressed')
          this.openImagePicker()
        }}/>
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
