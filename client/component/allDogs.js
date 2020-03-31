import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
<<<<<<< HEAD
  FlatList,
  ActivityIndicator,
  Dimensions,
=======
  Linking,
  Button,
  ActivityIndicator
>>>>>>> master
} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { getAllDogs } from '../store/allDogs';
import { likedDog } from '../store/likedDog';
import { removeDuplicates } from '../../utility/utils';
import axios from 'axios';

<<<<<<< HEAD
=======
const dogImg = require('../../assets/images/dog2.jpg');

>>>>>>> master
class AllDogs extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      page: 1,
      dogs: [],
    };

    this.view = this.view.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
  }

  async componentDidMount() {
<<<<<<< HEAD
    await this.props.getAllDogs(this.state.page);
    this.setState({
      dogs: this.props.allDogs,
    });
=======
    await this.props.getAllDogs();
  }

  async like(dog) {
    await this.props.likedDog(dog);
    // this.setState({ likedPaw: !this.state.likedPaw });
>>>>>>> master
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

<<<<<<< HEAD
  async handleLoadMore() {
    this.setState({
      page: this.state.page + 1,
    });
    await this.props.getAllDogs(this.state.page);
    this.setState({
      isLoading: false,
      dogs: [...this.state.dogs, ...this.props.allDogs],
    });
  }

  renderFooter = () => {
    return (
      <View>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };
=======
  render() {
    const { navigation } = this.props;
    // const { likedPaw } = this.state;
    console.log('this is props: ', this.props);
    return (
      <View>
        <View>
          <Text style={styles.topHeader}>Shelter-In-Pets</Text>
        </View>
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
                {/* <View style={styles.dogFooter}>
                  <TouchableOpacity
                    onPress={() => {
                      this.like(dog);
                    }}
                  >
                    <Ionicons
                      name={"ios-paw"}
                      color={"grey"}
                      // replace after debugging like : likedPaw ? 'hotpink' : 'grey'
                      size={30}
                    />
                  </TouchableOpacity>
>>>>>>> master

  render() {
    const { navigation } = this.props;

    this.state.dogs = removeDuplicates(this.state.dogs);
    let dogs;
    if (this.state.dogs.length === 0) {
      dogs = this.props.allDogs;
    } else {
      dogs = this.state.dogs;
    }

<<<<<<< HEAD
    return (
      <View>
        <FlatList
          style={{ height: '100%' }}
          numColumns={2}
          keyExtractor={({ item, key }) => key.toString()}
          data={dogs}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Single Dog', item.dog);
                this.view(item.dog);
              }}
            >
              <Image source={{ uri: item.uri }} style={styles.image} />
            </TouchableOpacity>
          )}
          bounces={false}
          onEndReached={() => this.handleLoadMore()}
          onEndReachedThreshold={0.2}
          ListFooterComponent={this.renderFooter}
        />
=======
                  <Ionicons
                    name={"ios-pin"}
                    size={30}
                    onPress={() =>
                      Linking.openURL(
                        `http://www.google.com/maps/place/${dog.contact.address.city},+${dog.contact.address.state}/`
                      )
                    }
                    color={"grey"}
                  />
                </View> */}
                {dog.name === 'Doggo' ? (
                  <Text style={styles.name}>Woof! Please give me a name!</Text>
                ) : (
                  <Text style={styles.name}>
                    Woof! My name is {titleCase(dog.name)}!
                  </Text>
                )}
              </View>
            );
          })}
        </ScrollView>
>>>>>>> master
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { allDogs: state.dogs.allDogs };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllDogs: page => {
      dispatch(getAllDogs(page));
    },
    likedDog: dog => {
      dispatch(likedDog(dog));
    },
  };
};

const Dogs = connect(mapStateToProps, mapDispatchToProps)(AllDogs);
export default Dogs;

const styles = StyleSheet.create({
  image: {
<<<<<<< HEAD
    height: 205,
    width: 205,
  },
=======
    width: '100%',
    height: 350
  },
  name: {
    fontSize: 18,
    padding: 10
  },
  nameMain: {
    fontSize: 22,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 10,
    fontWeight: 'bold'
  },
  dogIcon: {
    width: 30,
    height: 30,
    borderRadius: 50,
    padding: 5
  },
  topHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#147efb',
    backgroundColor: 'white',
    padding: 10
  },
  dogHeader: {
    flexDirection: 'row',
    padding: 5
  },
  dogFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
    marginLeft: 0,
    width: '30%'
  }
>>>>>>> master
});
