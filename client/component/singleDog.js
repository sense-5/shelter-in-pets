import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Linking, Toast } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { likeDog } from '../store/likedDog';
import { connect } from 'react-redux';
import { titleCase } from '../../utility/utils';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';

const dogImg = require('../../assets/images/dog2.jpg');

class SingleDog extends Component {
  constructor() {
    super();
    // this.state = {
    //   likedPaw: false,
    // };
    // this.like = this.like.bind(this);
  }

  async like(dog) {
    // console.log('in like');
    await this.props.likeDog(dog);
    // console.log('dog in like:', dog.id);

    // this.setState({ likedPaw: !this.state.likedPaw });
  }

  render() {
    const { status } = this.props;
    const dog = this.props.route.params;
    const name = dog.name;
    const breed = dog.breeds.primary;
    const location = dog.url;
    let coat = dog.coat;
    if (coat === null) {
      coat = 'not specified';
    }
    const houseTrained = dog.attributes.house_trained;
    const spayedNeutered = dog.attributes.spayed_neutered;
    const currentShots = dog.attributes.shots_current;
    const childrenFriendly = dog.environment.children;
    const catFriendly = dog.environment.cats;
    const goodWithOtherDogs = dog.environment.dogs;
    return (
      <View style={styles.container}>
        {dog.photos[0] ? (
          <Image source={{ uri: dog.photos[0].full }} style={styles.image} />
        ) : (
          <Image source={dogImg} style={styles.image} />
        )}

        <View style={styles.dogFooter}>
          <TouchableOpacity onPress={() => this.like(dog)}>
            <Ionicons
              name={'ios-paw'}
              size={30}
              color={this.state.likedPaw ? 'hotpink' : 'grey'}
            />
          </TouchableOpacity>

          <Ionicons
            name={'ios-mail'}
            size={30}
            onPress={() => Linking.openURL(`mailto:${dog.contact.email}`)}
          />
        </View>
        <View style={styles.bodyContainer}>
          <Text style={styles.name}>{titleCase(name)}</Text>
          <Text style={styles.bodyText}>Breed: {breed}</Text>
          <Text style={styles.bodyText}>Age: {dog.age}</Text>
          <Text style={styles.bodyText}>Size: {dog.size}</Text>
          <Text style={styles.bodyText}>Gender: {dog.gender}</Text>
          <Text style={styles.bodyText}>Coat: {coat}</Text>
          {houseTrained ? (
            <Text style={styles.bodyText}>
              <Ionicons
                name={'ios-checkmark-circle-outline'}
                color={'green'}
                size={20}
              />{' '}
              Housetrained
            </Text>
          ) : (
            <Text style={styles.bodyText}>
              <Ionicons
                name={'ios-close-circle-outline'}
                color={'red'}
                size={20}
              />{' '}
              Housetrained
            </Text>
          )}
          {spayedNeutered ? (
            <Text style={styles.bodyText}>
              <Ionicons
                name={'ios-checkmark-circle-outline'}
                color={'green'}
                size={20}
              />{' '}
              Spayed or Neutered
            </Text>
          ) : (
            <Text style={styles.bodyText}>
              <Ionicons
                name={'ios-close-circle-outline'}
                color={'red'}
                size={20}
              />{' '}
              Spayed or Neutered
            </Text>
          )}
          {currentShots ? (
            <Text style={styles.bodyText}>
              <Ionicons
                name={'ios-checkmark-circle-outline'}
                color={'green'}
                size={20}
              />{' '}
              Vaccinations
            </Text>
          ) : (
            <Text style={styles.bodyText}>
              <Ionicons
                name={'ios-close-circle-outline'}
                color={'red'}
                size={20}
              />{' '}
              Vaccinations
            </Text>
          )}
          {childrenFriendly ? (
            <Text style={styles.bodyText}>
              <Ionicons
                name={'ios-checkmark-circle-outline'}
                color={'green'}
                size={20}
              />{' '}
              Child-friendly
            </Text>
          ) : (
            <Text style={styles.bodyText}>
              <Ionicons
                name={'ios-close-circle-outline'}
                color={'red'}
                size={20}
              />{' '}
              Child-friendly
            </Text>
          )}
          {catFriendly ? (
            <Text style={styles.bodyText}>
              <Ionicons
                name={'ios-checkmark-circle-outline'}
                color={'green'}
                size={20}
              />{' '}
              Good with cats
            </Text>
          ) : (
            <Text style={styles.bodyText}>
              <Ionicons
                name={'ios-close-circle-outline'}
                color={'red'}
                size={20}
              />{' '}
              Good with cats
            </Text>
          )}
          {goodWithOtherDogs ? (
            <Text style={styles.bodyText}>
              <Ionicons
                name={'ios-checkmark-circle-outline'}
                color={'green'}
                size={20}
              />{' '}
              Good with other dogs
            </Text>
          ) : (
            <Text style={styles.bodyText}>
              <Ionicons
                name={'ios-close-circle-outline'}
                color={'red'}
                size={20}
              />{' '}
              Good with other dogs
            </Text>
          )}

          <Text style={styles.link} onPress={() => Linking.openURL(location)}>
            Click here to find me! Wruff!
          </Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    status: state.likedDogs.likedStatus,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    likeDog: dog => {
      dispatch(likeDog(dog));
    },
  };
};

const Dog = connect(mapStateToProps, mapDispatchToProps)(SingleDog);
export default Dog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  image: {
    width: '100%',
    height: '40%',
  },
  bodyContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    left: 15,
    padding: 10,
  },
  name: {
    paddingBottom: 5,
    fontSize: 22,
    fontWeight: 'bold',
  },
  bodyText: {
    padding: 2,
    fontSize: 16,
  },
  link: {
    color: 'blue',
    padding: 5,
    fontSize: 18,
    top: 10,
  },
  dogFooter: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    padding: 4,
    width: '25%',
  },
});
