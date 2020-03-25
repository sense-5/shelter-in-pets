import React, { Component } from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { connect } from "react-redux";
import { getPickedImage } from "./client/store/imagePicker";

class ImagePick extends Component {
  constructor() {
    super();
    // this.state = {
    //   pickedUri: ''
    // }
    this.openImagePicker = this.openImagePicker.bind(this);
  }

  async openImagePicker() {
    let pickerResult = await ImagePicker.launchImageLibraryAsync();

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
          <View>
            <Text style={styles.text}>See more pups like this one?</Text>
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
            <Text style={styles.text}>Show us your dream dog 🐾</Text>
            <Button title="Choose photo" onPress={this.openImagePicker} />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    height: 250,
    width: 250
  },
  text: {
    textAlign: "center",
    fontSize: 18
  }
});

const mapState = state => ({
  pickedImage: state.pickedImage
});

const mapDispatch = dispatch => ({
  getPickedImage: img => dispatch(getPickedImage(img.uri))
});

export default connect(mapState, mapDispatch)(ImagePick);
