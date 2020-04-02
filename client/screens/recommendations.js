import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  Dimensions,
  ScrollView
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { getRecDogs } from '../store/recommendations';

export class Recommendations extends Component {
  constructor() {
    super();
  }

  async componentDidMount() {
    await this.props.getRecDogs();
  }

  render() {
    let dogs;
    if (this.props.defaultDogs.length !== 0) {
      dogs = this.props.defaultDogs;
    } else {
      dogs = this.props.recDogs;
    }
    return (
      <View style={styles.outerContainer}>
        <View>
          <Text style={styles.topHeader}>Recommendations</Text>
        </View>
        <ScrollView scrollEventThrottle={16}>
          <View style={styles.container}>
            <Text style={styles.text}>based on your recent activity 🐾</Text>
            <View style={styles.imgContainer}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {dogs.map((dog, idx) => {
                  return (
                    <View key={idx}>
                      <View>
                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate(
                              'Single Dog',
                              dog.dog
                            )
                          }
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
                {/* <Bullets /> set up bullets */}
              </ScrollView>
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
    flex: 1,
    backgroundColor: 'white',
    paddingTop: '7%'
  },
  text: {
    textAlign: 'center',
    fontSize: 22,
    padding: 5,
    marginBottom: 20,
    color: '#147efb',
    fontWeight: 'bold'
  },
  imgContainer: {
    height: '100%',
    marginTop: 20
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
  }
});
