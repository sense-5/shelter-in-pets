import React, { Component } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { connect } from 'react-redux';
import { getPickedImage } from './client/store/imagePicker';
import Clarifai from 'clarifai';
import { TapGestureHandler } from 'react-native-gesture-handler';

import { CLARIFAI_KEY } from 'react-native-dotenv';

const app = new Clarifai.App({
  apiKey: `${CLARIFAI_KEY}`,
});

const dogArray = [
  'german shepherd',
  'labrador retriever',
  'american staffordshire terrier',
  'dachshund',
  'chihuahua',
  'boxer',
  'beagle',
  'australian cattle dog / blue heeler',
  'pit bull terrier',
  'american bulldog',
  'husky',
  'greyhound',
  'jack russell terrier',
  'akita',
  'australian shepherd',
  'basset hound',
  'border collie',
  'chow chow',
  'corgi',
  'doberman pinscher',
  'golden retriever',
  'great dane',
  'maltese',
  'mastiff',
  'pomeranian',
  'poodle',
  'pug',
  'rottweiler',
  'shih tzu',
  'yorkshire terrier',
];

class ImagePick extends Component {
  constructor() {
    super();
    this.state = {
      dogBreed: '',
    };
    this.openImagePicker = this.openImagePicker.bind(this);
  }

  async componentDidMount() {
    process.nextTick = setImmediate;
  }

  async openImagePicker() {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      base64: true,
    });

    await this.props.getPickedImage(pickerResult);

    const generalModel = await app.models.initModel({
      id: Clarifai.GENERAL_MODEL,
      version: 'aa7f35c01e0642fda5cf400f543e7c40',
    });

    try {
      if (generalModel) {
        const prediction = await generalModel.predict(pickerResult.base64);
        const concepts = prediction['outputs'][0]['data']['concepts'];
        console.log(concepts);
        const result = concepts.filter(concept => {
          return dogArray.indexOf(concept.name) !== -1;
        });
        if (result.length !== 0) {
          const dogBreed = result[0].name;
          this.setState({
            dogBreed,
          });
        } else {
          this.setState({
            dogBreed: null,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    console.log('picked image', this.props.pickedImage.pickedImage);

    return (
      <View style={styles.container}>
        {this.props.pickedImage.pickedImage ? (
          <View style={styles.container1}>
            <Text style={styles.text1}>See more pups like this one?</Text>
            <Button
              title="Yes Please!"
              onPress={this.props.SEND_IMAGE_TO_TEACHABLE_MACHINE_MODEL}
            />
            <Image
              style={styles.image}
              source={{ uri: this.props.pickedImage.pickedImage }}
            />
            {this.state.dogBreed ? (
              <Text style={styles.text1}>{this.state.dogBreed}</Text>
            ) : (
              <Text style={styles.text1}>Sorry we're not sure.</Text>
            )}
            <Button
              title="Wait, I'll pick a different one!"
              onPress={this.openImagePicker}
            />
          </View>
        ) : (
          <View>
            <View style={styles.container2}>
              <Text style={styles.text1}>Have a dream dog in mind? 🐾</Text>
              <Text style={styles.text1}>We can match your preferences</Text>
              <Text style={styles.text1}>when you upload a picture!</Text>
              <Button title="Choose Picture" onPress={this.openImagePicker} />
            </View>
            <View style={styles.container3}>
              <Text style={styles.text2}>No Picture? No Problem.</Text>
              <Button
                title="Use Filtered Search Instead"
                onPress={this.props.SEND_USER_TO_SEARCH_DOGS_FORM_PAGE}
              />
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 250,
    width: 250,
  },
  text1: {
    textAlign: 'center',
    fontSize: 18,
  },
  text2: {
    textAlign: 'center',
    fontSize: 18,
  },
  container1: {
    flex: 1,
    alignItems: 'center',
    marginTop: 200,
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    marginTop: 320,
  },
  container3: {
    flex: 1,
    alignItems: 'center',
    marginTop: 250,
  },
});

const mapState = state => ({
  pickedImage: state.pickedImage,
});

const mapDispatch = dispatch => ({
  getPickedImage: img => dispatch(getPickedImage(img.uri)),
});

export default connect(mapState, mapDispatch)(ImagePick);
