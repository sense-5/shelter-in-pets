import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { getDogsByBreed } from '../store/allDogs';
import { titleCase } from '../../utility/utils';
import { Ionicons } from '@expo/vector-icons';
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
        breed: dog.breeds.primary,
      }
    );
  }

  render() {
    const { navigation } = this.props;
    return (
      <View>
        <ScrollView>
          {this.props.dogs.map(dog => {
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
                  ></TouchableOpacity>
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
  return {
    dogs: state.dogs.dogsByBreed,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDogsByBreed: breed => dispatch(getDogsByBreed(breed)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DogsByBreed);

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
