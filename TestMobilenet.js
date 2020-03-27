import React, {Component} from 'react'
import {View, Text, StyleSheet, Button, Image} from 'react-native'
import {connect} from 'react-redux'
import * as tf from '@tensorflow/tfjs'
import {fetch, decodeJpeg, bundleResourceIO} from '@tensorflow/tfjs-react-native'
// import * as mobilenet from '@tensorflow-models/mobilenet'
import * as tmImage from '@teachablemachine/image';
import * as jpeg from 'jpeg-js'

const URL = "https://teachablemachine.withgoogle.com/models/0lKSu52Fy/";
const modelJson = require('./assets/model/model.json')
const modelWeights = require('./assets/model/weights.bin')
const metadata = require('./assets/model/metadata.json')


class MobilenetTest extends Component {
  constructor(){
    super()
    this.state = {
      isTFReady: false,
      isModelReady: false,
      predictions: null,
      image: {
        uri: ''
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
    this.model = await tf.loadLayersModel(
      bundleResourceIO(modelJson, modelWeights, metadata));
      // bundleResourceIO(modelJson, metadata));

    this.setState({
      isModelReady: true
    })
    console.log('isTFready? : ', this.state.isTFReady)
    console.log('isModelReady? : ', this.state.isModelReady)
    console.log(this.model)

    console.log('props are ', this.props)

  }//end component did mount

  imageToTensor(rawImageData){
    const TO_UINT8ARRAY = true;
    let {width, height, data} = jpeg.decode(rawImageData, TO_UINT8ARRAY)
    //The TO_UINT8ARRAY array represents an array of 8-bit unsigned integers

    //drop the alpha channel info for mobilenet
    // const buffer = new Uint8Array(width * height * 224 * 3)
    width = 224
    height = 224

    const buffer = new Uint8Array(width * height * 3)
    console.log('buffer is ', buffer)
    let offset = 0 //offset into original data
    for(let i = 0; i < buffer.length; i++){
      buffer[i] = data[offset]
      buffer[i+1] = data[offset+1]
      buffer[i+2] = data[offset+2]
      offset += 4
    }

    // null,224,224,3

    return tf.tensor4d(buffer, [1, width, height, 3])

  }//end image to tensor


  async classifyImage(){
    console.log('in classify image func')
    console.log('props in classify image ', this.props)
    try {
      // const imageAssetPath = Image.resolveAssetSource(this.props.pickedImage);
      // console.log('imageAssetPath is ', imageAssetPath)

      const response = await fetch(this.props.pickedImage, {}, {isBinary: true})
      const rawImageData = await response.arrayBuffer()




      const imageTensor = this.imageToTensor(rawImageData)
      // const imageTensor = decodeJpeg(this.props.pickedImage);

      // const predictions = await this.model.classify(imageTensor)
      // const predictions = await this.model.predict(imageTensor)
      const prediction = await this.model.predict(imageTensor)
      // const predictions = await this.model.predict(this.state.image.uri)
      console.log('predictions!!!!!!!!! ', prediction)


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

const mapState = state => ({
  pickedImage: state.pickedImage.pickedImage
})

// export default MobilenetTest
export default connect(mapState, null)(MobilenetTest)
