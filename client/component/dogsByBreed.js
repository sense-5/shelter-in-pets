import React from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { getDogsByBreed } from '../store/allDogs';
import { titleCase } from '../../utility/utils';

import axios from 'axios';

const dogImg = require('../../assets/images/dog2.jpg');

class DogsByBreed extends React.Component {
  constructor() {
    super();
    this.view = this.view.bind(this);
  }

  async componentDidMount() {
    const breed = this.props.route.params.toLowerCase();
    await this.props.getDogsByBreed(breed);
  }

  async view(dog) {
    await axios.post(
      'http://localhost:3000/api/viewedDog',
      // 'https://shelter-in-pets-server.herokuapp.com/api/viewedDogs',
      {
        petFinderId: dog.id,
        breed: dog.breeds.primary
      }
    );
  }

  render() {
    const { navigation } = this.props;
    console.log('dog images', this.props.dogs);
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
<<<<<<< HEAD
    height: 205,
    width: 205,
=======
    height: 210,
    width: 210
>>>>>>> master
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
