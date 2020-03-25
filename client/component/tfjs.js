import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import {connect} from 'react-redux';
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";
import * as tmImage from '@teachablemachine/image';

const URL = "https://teachablemachine.withgoogle.com/models/0lKSu52Fy/";

const modelJSON = require('../../assets/model/model.json')
const modelmetadata = require('../../assets/model/metadata.json')

let model, maxPredictions;
    // Load the image model and setup the webcam
async function init() {
  console.log('init func')
    // const modelURL = URL + "model.json";
    // const metadataURL = URL + "metadata.json";
    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelJSON, modelmetadata);
    maxPredictions = model.getTotalClasses();
    console.log('model in init ', model)
}
//init()//model initialized

async function prediction(userImg) {
  console.log('hello welcome to predict')
  // console.log('userImg is ', userImg)
  const modelPrediction = await model.predict(userImg);
  // console.log('mode is ', model)
  console.log('model prediction is ', modelPrediction)
} ///getting prediction

class TFtest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTfReady: false
    };
  }

  async componentDidMount() {
    init()
    // Wait for tf to be ready.
    await tf.ready();
    // Signal to the app that tensorflow.js can now be used.
    this.setState({
      isTfReady: true
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>tfjs.js is working!</Text>
        <Button title="check model" onPress={()=>{
          console.log('pressed')
          console.log('picked image is ', this.props.pickedImage)
          prediction(this.props.pickedImage)
        }} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  }
});

const mapState = state => ({
  pickedImage: state.pickedImage.pickedImage
})

// export default TFtest
export default connect(mapState, null)(TFtest)
