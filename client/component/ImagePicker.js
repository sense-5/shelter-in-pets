import React, { Component } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { connect } from 'react-redux';
import { getPickedImage, getAllBreeds } from '../store/imagePicker';
import Clarifai from 'clarifai';
import { breedPrediction } from '../../utility/clarifai';
// import { TapGestureHandler } from 'react-native-gesture-handler';

import { CLARIFAI_KEY } from 'react-native-dotenv';
import { TouchableOpacity } from 'react-native-gesture-handler';

const app = new Clarifai.App({
  apiKey: `${CLARIFAI_KEY}`,
});

class ImagePick extends Component {
  constructor() {
    super();
    this.state = {
      dogBreed: '',
      allBreeds: [],
    };
    this.openImagePicker = this.openImagePicker.bind(this);
  }

  async componentDidMount() {
    await this.props.getAllBreeds();
    this.setState({
      allBreeds: this.props.breeds,
    });
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
        const result = breedPrediction(concepts, this.state.allBreeds);

        if (result.length !== 0) {
          const dogBreed = result[0];
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
            <Image
              style={styles.image}
              source={{ uri: this.props.pickedImage.pickedImage }}
            />
            {this.state.dogBreed ? (
              <Text style={styles.text1}>
                Are you looking for a {this.state.dogBreed}?
              </Text>
            ) : (
              <Text style={styles.text1}>Sorry we're not sure.</Text>
            )}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Yes! Show me more...</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>I'm not sure...?</Text>
              </TouchableOpacity>
            </View>

            <Button
              title="Wait, I'll pick a different image!"
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
    justifyContent: 'flex-start',
  },
  image: {
    height: 350,
    width: 400,
  },
  text1: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
  text2: {
    textAlign: 'center',
    fontSize: 18,
  },
  container1: {
    flex: 1,
    alignItems: 'center',
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    marginTop: 250,
  },
  container3: {
    flex: 1,
    alignItems: 'center',
    marginTop: 250,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#F4CBF0',
    borderColor: '#6E13DB',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    margin: 20,
    width: 150,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const mapState = state => ({
  pickedImage: state.pickedImage,
  breeds: state.pickedImage.breeds,
});

const mapDispatch = dispatch => {
  return {
    getPickedImage: img => dispatch(getPickedImage(img.uri)),
    getAllBreeds: () => dispatch(getAllBreeds()),
  };
};

export default connect(mapState, mapDispatch)(ImagePick);
