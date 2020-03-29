import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Button,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { getAllDogs } from '../store/allDogs';
import { likedDog } from '../store/likedDog';
import { titleCase } from '../../utility/utils';
import axios from 'axios';

const dogImg = require('../../assets/images/dog2.jpg');
let count = 1;
class AllDogs extends Component {
  constructor() {
    super();
    // TODO: need a liked porperty in the dogs that are returned. need to check dogs from petfinder against our database.
    // this.state = {
    //   likedPaw: false,
    // };
    this.like = this.like.bind(this);
    this.view = this.view.bind(this);
  }

  async componentDidMount() {
    await this.props.getAllDogs();
  }

  async like(dog) {
    console.log('in like handler AD');
    await this.props.likedDog(dog);
    // this.setState({ likedPaw: !this.state.likedPaw });
  }

  async view(dog) {
    if (count > 0) {
      console.log('in view handler AD', count);
      count++;
    }

    await axios.post(
      'http://localhost:3000/api/viewedDog',
      // 'https://shelter-in-pets-server.herokuapp.com/api/viewedDogs',
      {
        petFinderId: dog.id,
        breed: dog.breeds.primary,
      }
    );
  }

  render() {
    const { navigation } = this.props;
    // const { likedPaw } = this.state;

    return (
      <View>
        <ScrollView>
          {this.props.allDogs.map(dog => {
            const regex = new RegExp('[0-9]+');
            if (regex.test(dog.name)) {
              dog.name = 'Doggo';
            }

            return (
              <View key={dog.id} style={styles.dogContainer}>
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

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Single Dog', dog);
                    this.view(dog);
                  }}
                >
                  {dog.photos[0] ? (
                    <Image
                      source={{ uri: dog.photos[0].full }}
                      style={styles.image}
                    />
                  ) : (
                    <Image source={dogImg} style={styles.image} />
                  )}
                </TouchableOpacity>
                {dog.name === 'Doggo' ? (
                  <Text style={styles.name}>Woof! Please give me a name!</Text>
                ) : (
                  <Text style={styles.name}>
                    Woof! My name is {titleCase(dog.name)}!
                  </Text>
                )}

                <View style={styles.dogFooter}>
                  <TouchableOpacity
                    onPress={() => {
                      this.like(dog);
                    }}
                  >
                    <Ionicons
                      name={'ios-paw'}
                      color={'grey'}
                      // replace after debugging like : likedPaw ? 'pink' :
                      //#fb1d1d good red color for eventual toggle
                      size={30}
                    />
                  </TouchableOpacity>

                  <Ionicons
                    name={'ios-mail'}
                    size={30}
                    onPress={this.likeSwitch}
                  />
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { allDogs: state.dogs.allDogs };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllDogs: () => {
      dispatch(getAllDogs());
    },
    likedDog: dog => {
      dispatch(likedDog(dog));
    },
  };
};

const Dogs = connect(mapStateToProps, mapDispatchToProps)(AllDogs);
export default Dogs;

const styles = StyleSheet.create({
  dogContainer: {
    marginBottom: 20,
  },
  image: {
    height: 350,
    width: '100%',
  },
  name: {
    fontSize: 18,
    paddingTop: 10,
    paddingLeft: 10,
  },
  nameMain: {
    fontSize: 22,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 10,
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
    justifyContent: 'space-around',
    padding: 5,
    marginLeft: 0,
    width: '25%',
  },
});
