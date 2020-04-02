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

// const dogImg = [
//   {
//     uri:
//       'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*'
//   },
//   {
//     uri:
//       'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-dog-quotes-1580508958.jpg?crop=0.670xw:1.00xh;0.167xw,0&resize=640:*'
//   },
//   { uri: 'https://content.fortune.com/wp-content/uploads/2019/01/boo.jpg' },
//   {
//     uri:
//       'https://www.washingtonpost.com/resizer/uwlkeOwC_3JqSUXeH8ZP81cHx3I=/arc-anglerfish-washpost-prod-washpost/public/HB4AT3D3IMI6TMPTWIZ74WAR54.jpg'
//   }
// ];

export class Recommendations extends Component {
  constructor() {
    super();
  }

  async componentDidMount() {
    await this.props.getRecDogs();
  }

  render() {
    let dogs;
    if (this.props.defaultDogs) {
      dogs = this.props.defaultDogs;
    } else {
      dogs = this.props.recDogs;
    }
    return (
      <ScrollView scrollEventThrottle={16}>
        <View style={styles.container}>
          <Text style={styles.text}>Recommended based on your activity</Text>
          <View style={styles.imgContainer}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {dogs.map((dog, idx) => {
                return (
                  <View key={idx}>
                    <View>
                      <TouchableOpacity>
                        <Image
                          style={styles.img}
                          source={{
                            uri: dog.uri
                          }}
                        />
                        <Text style={styles.text}>{dog.dog.name}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
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
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20
  },
  text: {
    fontSize: 24,
    fontWeight: '700',
    paddingHorizontal: 20
  },
  imgContainer: {
    height: '100%',
    marginTop: 20
  },
  img: {
    height: 300,
    width: 450
  }
});