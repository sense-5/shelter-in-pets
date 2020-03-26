<<<<<<< HEAD
import React, { Component } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
=======
import React, { Component } from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { connect } from "react-redux";
import { getPickedImage } from "./client/store/imagePicker";
>>>>>>> 979dbc7f49d83c8fbfca4572667fbe1d3e9159ff

class ImagePick extends Component {
  constructor() {
    super();
<<<<<<< HEAD
    this.state = {
      pickedUri: '',
    };
=======
    // this.state = {
    //   pickedUri: ''
    // }
>>>>>>> 979dbc7f49d83c8fbfca4572667fbe1d3e9159ff
    this.openImagePicker = this.openImagePicker.bind(this);
  }

  async openImagePicker() {
    let pickerResult = await ImagePicker.launchImageLibraryAsync();

<<<<<<< HEAD
    this.setState({
      pickedUri: pickerResult.uri,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.pickedUri ? (
          <View>
            <Text>chosen dog</Text>
            <Image
              style={styles.image}
              source={{ uri: this.state.pickedUri }}
            />
          </View>
        ) : (
          <Text>choose a photo</Text>
        )}

        <Button title="Choose photo" onPress={this.openImagePicker} />
=======
    // this.setState({
    //   pickedUri: pickerResult.uri
    // })
    this.props.getPickedImage(pickerResult);
  }

  render() {
    console.log("picked image", this.props.pickedImage.pickedImage);

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
>>>>>>> 979dbc7f49d83c8fbfca4572667fbe1d3e9159ff
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 250,
    width: 250,
  },
});

export default ImagePick;
=======
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    height: 250,
    width: 250
  },
  text1: {
    textAlign: "center",
    fontSize: 18
  },
  text2: {
    textAlign: "center",
    fontSize: 18
  },
  container1: {
    flex: 1,
    alignItems: "center",
    marginTop: 200
  },
  container2: {
    flex: 1,
    alignItems: "center",
    marginTop: 320
  },
  container3: {
    flex: 1,
    alignItems: "center",
    marginTop: 250
  }
});

const mapState = state => ({
  pickedImage: state.pickedImage
});

const mapDispatch = dispatch => ({
  getPickedImage: img => dispatch(getPickedImage(img.uri))
});

export default connect(mapState, mapDispatch)(ImagePick);
>>>>>>> 979dbc7f49d83c8fbfca4572667fbe1d3e9159ff
