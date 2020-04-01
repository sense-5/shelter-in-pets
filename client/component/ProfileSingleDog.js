import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Linking,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { likeDog, getLikedDogsIds } from '../store/likedDog';
import { connect } from 'react-redux';
import { titleCase, redoPhoneNum, redoCity } from '../../utility/utils';
import { TouchableOpacity } from 'react-native-gesture-handler';

const dogImg = require('../../assets/images/dog2.jpg');

class ProfileSingleDog extends Component {
  constructor() {
    super();
    this.state = {
      likedPaw: true,
    };
    this.like = this.like.bind(this);
  }

  async like(dog) {
    await this.props.likeDog(dog);
    await this.props.getLikedDogsIds();

    this.setState({ likedPaw: !this.state.likedPaw });
  }

  render() {
    const likedStatus = this.props.likedStatus;
    console.log('status:', likedStatus);
    const dog = this.props.route.params;
    const location = dog.contact.address;
    const city = redoCity(dog.contact.address.city);
    const phone = redoPhoneNum(dog.contact.phone);
    const breed = dog.breeds.primary;
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
        <ScrollView>
          <View style={styles.dogHeader}>
            {dog.photos[0] ? (
              <Image
                source={{ uri: dog.photos[0].full }}
                style={styles.dogIcon}
              />
            ) : (
              <Image source={dogImg} style={styles.dogIcon} />
            )}
            <Text style={styles.nameMain}>{titleCase(dog.name)}</Text>
          </View>
          <Image source={{ uri: dog.photos[0].full }} style={styles.image} />
          <View style={styles.dogFooter}>
            <TouchableOpacity onPress={() => this.like(dog)}>
              <Ionicons
                name={'ios-paw'}
                size={30}
                color={likedStatus || this.state.likedPaw ? 'hotpink' : 'grey'}
              />
            </TouchableOpacity>

            <Ionicons
              name={'ios-mail'}
              size={30}
              onPress={() => Linking.openURL(`mailto:${dog.contact.email}`)}
              color={'grey'}
            />

            <Ionicons
              name={'ios-call'}
              size={30}
              onPress={() => Linking.openURL(`tel:${phone}`)}
              color={'grey'}
            />

            <Ionicons
              name={'ios-pin'}
              size={30}
              onPress={() =>
                Linking.openURL(
                  //`http://www.google.com/maps/place/${location.city},+${location.state}/`
                  `http://www.google.com/maps/place/${location.postcode}`
                )
              }
              color={'grey'}
            />
          </View>
          <View style={styles.bodyContainer}>
            <Text style={styles.bodyTextHeader}>My Details: </Text>
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
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    likedStatus: state.likedDogs.likedStatus,
    allLikedDogs: state.likedDogs.allLikedDogs,
    ids: state.likedDogs.ids,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    likeDog: dog => {
      dispatch(likeDog(dog));
    },
    getLikedDogsIds: () => dispatch(getLikedDogsIds()),
  };
};

const ProfileDog = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileSingleDog);
export default ProfileDog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  image: {
    width: '100%',
    height: 350,
  },
  bodyContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    left: 10,
    padding: 5,
    paddingBottom: 20,
  },
  nameMain: {
    fontSize: 22,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 10,
    fontWeight: 'bold',
  },
  bodyTextHeader: {
    padding: 2,
    fontSize: 18,
    fontWeight: 'bold',
  },
  bodyText: {
    padding: 2,
    fontSize: 18,
  },
  dogIcon: {
    width: 30,
    height: 30,
    borderRadius: 50,
    padding: 5,
  },
  dogHeader: {
    flexDirection: 'row',
    padding: 5,
  },
  dogFooter: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    padding: 4,
    paddingBottom: 0,
    width: '40%',
  },
});
