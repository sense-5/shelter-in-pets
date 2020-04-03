import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { getRecDogs } from '../store/recommendations';
import axios from 'axios';
import env from '../../environment';

export class Recommendations extends Component {
  constructor() {
    super();
    this.view = this.view.bind(this);
  }

  async componentDidMount() {
    await this.props.getRecDogs();
  }

  async view(dog) {
    await axios.post(`${env.apiUrl}/api/viewedDog`, {
      petFinderId: dog.id,
      breed: dog.breeds.primary
    });
  }

  render() {
    let dogs;
    if (this.props.defaultDogs.length !== 0) {
      dogs = this.props.defaultDogs;
    } else {
      dogs = this.props.recDogs;
    }
    const logo = require('../../assets/images/logo.jpg');
    return (
      <View style={styles.outerContainer}>
        <View>
          <Text style={styles.topHeader}>Recommendations</Text>
        </View>
        <ScrollView scrollEventThrottle={16}>
          <View style={styles.container}>
            <View style={styles.imgContainer}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={true}
              >
                {dogs.map((dog, idx) => {
                  return (
                    <View key={idx}>
                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            this.props.navigation.navigate(
                              'Single Dog',
                              dog.dog
                            );
                            this.view(dog.dog);
                          }}
                        >
                          <Image
                            style={styles.img}
                            source={{
                              uri: dog.uri
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
              <View style={styles.swipeFooter}>
                <Text style={styles.arrows}>
                  ◄{'  '}swipe{'  '}►
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    recDogs: state.recDogs.recDogs,
    defaultDogs: state.recDogs.defaultDogs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRecDogs: () => {
      dispatch(getRecDogs());
    }
  };
};

const Recs = connect(mapStateToProps, mapDispatchToProps)(Recommendations);
export default Recs;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  container: {
    flex: 1
  },
  imgContainer: {
    height: '100%'
  },
  img: {
    height: 450,
    width: 450
  },
  topHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 1000,
    color: '#147efb',
    backgroundColor: 'white',
    padding: 10
  },
  dogIcon: {
    width: 40,
    height: 40,
    borderRadius: 50,
    padding: 5
  },
  swipeFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 5,
    marginBottom: 100
  },
  arrows: {
    fontSize: 18,
    color: 'grey',
    fontWeight: 'bold'
  }
});
