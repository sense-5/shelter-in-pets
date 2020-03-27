import React, {Component} from 'react'
import {View, Text, StyleSheet, Button, Image} from 'react-native'
import * as tf from '@tensorflow/tfjs'
import {fetch} from '@tensorflow/tfjs-react-native'
import * as mobilenet from '@tensorflow-models/mobilenet'
import * as jpeg from 'jpeg-js'


class MobilenetTest extends Component {
  constructor(){
    super()
    this.state = {
      isTFReady: false,
      isModelReady: false,
      predictions: null,
      image: {
        uri: 'https://www.washingtonpost.com/resizer/uwlkeOwC_3JqSUXeH8ZP81cHx3I=/arc-anglerfish-washpost-prod-washpost/public/HB4AT3D3IMI6TMPTWIZ74WAR54.jpg'
      }
    }
    this.imageToTensor = this.imageToTensor.bind(this)
    this.classifyImage = this.classifyImage.bind(this)
  }//end constructor

  async componentDidMount(){
    console.log('in component did mount')
    await tf.ready();
    this.setState({
      isTFReady: true
    })
    console.log('loading mobilenet model')
    this.model = await mobilenet.load()

    this.setState({
      isModelReady: true
    })
    console.log('isTFready? : ', this.state.isTFReady)
    console.log('isModelReady? : ', this.state.isModelReady)
  }//end component did mount


  imageToTensor(rawImageData){
    const TO_UINT8ARRAY = true;
    const {width, height, data} = jpeg.decode(rawImageData, TO_UINT8ARRAY)
    //The TO_UINT8ARRAY array represents an array of 8-bit unsigned integers

    //drop the alpha channel info for mobilenet
    const buffer = new Uint8Array(width * height * 3)
    let offset = 0 //offset into original data

    for(let i = 0; i < buffer.length; i++){
      buffer[i] = data[offset]
      buffer[i+1] = data[offset+1]
      buffer[i+2] = data[offset+2]
      offset += 4
    }
    return tf.tensor3d(buffer, [height, width, 3])
  }//end image to tensor


  async classifyImage(){
    console.log('in classify image func')
    try {
      const imageAssetPath = Image.resolveAssetSource(this.state.image);
      const response = await fetch(imageAssetPath.uri, {}, {isBinary: true})
      const rawImageData = await response.arrayBuffer()
      const imageTensor = this.imageToTensor(rawImageData)
      const predictions = await this.model.classify(imageTensor)
      console.log('predictions!!!!!!!!! ', predictions)


    } catch (error) {
      console.log('hey!! u hit an error in classifyImage!!!!')
      console.error(error)
    }
  }//end classify image

  render(){
    return(
      <View>
        <Text>hello mobilenet bb</Text>

        <Text>TFJS ready? {this.state.isTFReady ?
          <Text>Yes</Text> :
          <Text>No</Text>}
        </Text>

        <Text>
          Model Ready? {' '}
          {this.state.isModelReady ?
            <Text>Yes</Text> :
            <Text>Loading Model...</Text>
          }
        </Text>

        <Button onPress={this.classifyImage} title="classify the image" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default MobilenetTest
