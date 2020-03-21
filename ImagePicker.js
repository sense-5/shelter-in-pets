import React,  {Component} from 'react'
import {View, Text, Image, Button, StyleSheet} from 'react-native'
import * as ImagePicker from 'expo-image-picker';

class ImagePick extends Component {
  constructor(){
    super()
    this.state = {
      pickedUri: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.washingtonpost.com%2Fscience%2F2019%2F09%2F25%2Fwhat-makes-dogs-so-special-successful-love%2F&psig=AOvVaw35dGPyz5Mrc7Y4SAZNiDAS&ust=1584905757865000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLCMppqorOgCFQAAAAAdAAAAABAD'
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
    return(
      <View style={styles.container}>

        <Text>chosen image:</Text>
        <Image style={styles.image} source={{uri: this.state.pickedUri}}/>

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
