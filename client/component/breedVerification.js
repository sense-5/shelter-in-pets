import React, { Component } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

export default class BreedVerification extends Component {
  constructor() {
    super();
    this.state = {
      outputBreed: undefined,
    };

    this.handleBreedConfirmation = this.handleBreedConfirmation.bind(this);
  }

  handleBreedConfirmation() {}

  render() {
    return (
      <View style={styles.contatiner}>
        {this.state.outputBreed ? (
          <View>
            <Text>Is this the breed you are looking for?</Text>
            {/* <Image> Maybe static image that matches this.state.outputBreed</Image> */}
            <Text>{this.state.outputBreed}</Text>
            <Button title="YES" onPress={this.handleBreedConfirmation} />
          </View>
        ) : (
          <View>
            <Text>Let us help you find your perfect dog.</Text>
            <Button title="Set Preferences" />
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
});
