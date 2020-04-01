import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { getDogsByBreed } from '../store/allDogs';

import axios from 'axios';

const dogImg = require('../../assets/images/dog2.jpg');

class DogsByBreed extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
    this.view = this.view.bind(this);
  }

  async componentDidMount() {
    const breed = this.props.route.params.toLowerCase();
    await this.props.getDogsByBreed(breed);
    this.setState({
      loading: false,
    });
  }

  async view(dog) {
    await axios.post(
      'http://localhost:3000/api/viewedDog',
      // 'https://shelter-in-pets-server.herokuapp.com/api/viewedDog',
      {
        petFinderId: dog.id,
        breed: dog.breeds.primary
      }
    );
  }

  render() {
    const { navigation } = this.props;
    if (this.state.loading) {
      return (
        <View>
          <ActivityIndicator
            animating
            size="large"
            style={{ flex: 1, marginTop: '50%' }}
          />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        {this.props.dogs.length !== 0 ? (
          <FlatList
            numColumns={2}
            keyExtractor={({ item, key }) => key.toString()}
            data={this.props.dogs}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Single Dog', item.dog);
                  this.view(item.dog);
                }}
              >
                <Image source={{ uri: item.uri }} style={styles.image} />
              </TouchableOpacity>
            )}
          />
        ) : (
          <View style={styles.container}>
            <Image source={dogImg} style={styles.dogImage} />
            <Text style={styles.text}>
              Sorry, we might not have what you're looking for.
            </Text>
            <Text style={styles.text}>Please check back soon!</Text>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    dogs: state.dogs.dogsByBreed
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDogsByBreed: breed => dispatch(getDogsByBreed(breed))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DogsByBreed);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    height: 207,
    width: 207
  },
  dogImage: {
    height: 400,
    width: '100%'
  },
  text: {
    justifyContent: 'center',
    color: '#147efb',
    fontWeight: 'bold',
    padding: 10,
    fontSize: 20,
    textAlign: 'center'
  }
});
