import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { connect } from 'react-redux';
import { getPickedImage, getAllBreeds } from '../store/imagePicker';
import Clarifai from 'clarifai';
import { breedPrediction } from '../../utility/prediction';
import { upperCase } from '../../utility/utils';
// import { TapGestureHandler } from 'react-native-gesture-handler';

import { CLARIFAI_KEY } from 'react-native-dotenv';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContext } from 'react-navigation';

const app = new Clarifai.App({
  apiKey: `${CLARIFAI_KEY}`
});

class ImagePick extends Component {
  constructor() {
    super();
    this.state = {
      dogBreed: '',
      allBreeds: []
    };
    this.openImagePicker = this.openImagePicker.bind(this);
  }

  async componentDidMount() {
    await this.props.getAllBreeds();
    this.setState({
      allBreeds: this.props.breeds
    });
    process.nextTick = setImmediate;
  }

  async openImagePicker() {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      base64: true
    });

    await this.props.getPickedImage(pickerResult);

    const generalModel = await app.models.initModel({
      id: Clarifai.GENERAL_MODEL,
      version: 'aa7f35c01e0642fda5cf400f543e7c40'
    });

    try {
      if (generalModel) {
        const prediction = await generalModel.predict(pickerResult.base64);

        const concepts = prediction['outputs'][0]['data']['concepts'];
        console.log(concepts);
        const result = breedPrediction(concepts, this.state.allBreeds);

        if (result.length !== 0) {
          let dogBreed = result[0];
          dogBreed = upperCase(dogBreed);
          this.setState({
            dogBreed
          });
        } else {
          this.setState({
            dogBreed: null
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const breeds = this.state.allBreeds;
    const dogBreed = this.state.dogBreed;
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.topHeader}>Upload to Search</Text>
        </View>
        <ScrollView>
          <View>
            {this.props.pickedImage.pickedImage ? (
              <View style={styles.container1}>
                <Image
                  style={styles.image}
                  source={{ uri: this.props.pickedImage.pickedImage }}
                />
                {dogBreed ? (
                  <View>
                    <Text style={styles.text3}>
                      Are you looking for a {dogBreed}?
                    </Text>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={styles.button2}
                        onPress={() => {
                          this.props.navigation.navigate('Breed Options', {
                            breeds,
                            dogBreed
                          });
                        }}
                      >
                        <Text style={styles.buttonText}>
                          Yes! Show me more!
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View>
                    <Text style={styles.text3}>Sorry we're not sure.</Text>
                  </View>
                )}
                <TouchableOpacity
                  style={styles.button2}
                  onPress={this.openImagePicker}
                >
                  <Text style={styles.buttonText}>Choose Different Image</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button2}
                  onPress={() =>
                    this.props.navigation.navigate('Filtered Search')
                  }
                >
                  <Text style={styles.buttonText}>Try Filtered Search</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <View style={styles.container2}>
                  <Text style={styles.text1}>Have a dream dog in mind? 🐾</Text>
                  <Text style={styles.text1}>
                    We can match your preferences
                  </Text>
                  <Text style={styles.text1}>when you upload a picture!</Text>
                  <TouchableOpacity
                    style={styles.button2}
                    onPress={this.openImagePicker}
                  >
                    <Text style={styles.buttonText}>Choose Picture</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.container3}>
                  <Text style={styles.text2}>No Picture? No Problem.</Text>
                  <TouchableOpacity
                    style={styles.button2}
                    onPress={() =>
                      this.props.navigation.navigate('Filtered Search')
                    }
                  >
                    <Text style={styles.buttonText}>Try Filtered Search</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  topHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 1000,
    color: '#147efb',
    backgroundColor: 'white',
    padding: 10
  },
  image: {
    height: 350,
    width: 420
  },
  text1: {
    textAlign: 'center',
    fontSize: 22,
    padding: 5
  },
  text2: {
    textAlign: 'center',
    fontSize: 22
  },
  text3: {
    textAlign: 'center',
    fontSize: 18,
    padding: 5,
    marginTop: 10,
    color: '#147efb',
    fontWeight: 'bold'
  },
  container1: {
    flex: 1,
    alignItems: 'center'
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    marginTop: '40%'
  },
  container3: {
    flex: 1,
    alignItems: 'center',
    marginTop: '10%'
  },
  buttonContainer2: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  buttonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10
  },
  button2: {
    backgroundColor: 'white',
    borderColor: '#147efb',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    margin: 20,
    width: 300
  },
  buttonText: {
    color: '#147efb',
    textAlign: 'center',
    fontSize: 18
  }
});

const mapState = state => ({
  pickedImage: state.pickedImage,
  breeds: state.pickedImage.breeds
});

const mapDispatch = dispatch => {
  return {
    getPickedImage: img => dispatch(getPickedImage(img.uri)),
    getAllBreeds: () => dispatch(getAllBreeds())
  };
};

export default connect(mapState, mapDispatch)(ImagePick);
