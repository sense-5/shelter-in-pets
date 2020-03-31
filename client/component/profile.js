import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Button,
  ActivityIndicator,
  RefreshControl,
  FlatList,
  Toast,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { titleCase } from '../../utility/utils';
import { getLikedDogs } from '../store/likedDog';
import axios from 'axios';

import { getMe } from '../store/user';
const dogImg = require('../../assets/images/dog2.jpg');

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    await this.props.getLikedDogs();
  }

  // async componentDidUpdate() {
  //   console.log('in componentDidUpdate');
  //   if (this.props.allLikedDogs) {
  //     console.log('component did update has dogs');
  //     await this.props.getLikedDogs();
  //   }
  // }

  render() {
    const { navigation } = this.props;
    const dogs = this.props.allLikedDogs;
    console.log('in profile:', dogs.allLikedDogs);

    // const [refreshing, setRefreshing] = React.useState(false);
    // const [listData, setListData] = React.useState(this.props.allLikedDogs);

    // const onRefresh = React.useCallback(async () => {
    //   setRefreshing(true);
    //   if (listData.length < 10) {
    //     try {
    //       let response = await this.props.getLikedDogs();
    //       let responseJson = await response.json();
    //       setListData(responseJson.result.concat(this.props.allLikedDogs));
    //       setRefreshing(false);
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   } else {
    //     Toast.show('No more new data available', Toast.SHORT);
    //     setRefreshing(false);
    //   }
    // }, [refreshing]);

    return (
      <View>
        <View>
          <Text style={styles.topHeader}>My Favorites Page</Text>
        </View>
        {dogs.length !== 0 ? (
          <ScrollView>
            {dogs.map(dog => {
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
                    <Text style={styles.name}>
                      Woof! Please give me a name!
                    </Text>
                  ) : (
                    <Text style={styles.name}>
                      Woof! My name is {titleCase(dog.name)}!
                    </Text>
                  )}
                </View>
              );
            })}
            {/* <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> */}
          </ScrollView>
        ) : (
          <View style={styles.textContainer}>
            <Button
              title="Like Some Dogs"
              onPress={() => {
                navigation.navigate('home');
              }}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 200,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
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
    fontWeight: 'bold',
  },
  dogIcon: {
    width: 30,
    height: 30,
    borderRadius: 50,
    padding: 5,
  },
  topHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#147efb',
    backgroundColor: 'white',
    padding: 10,
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

const mapStateToProps = state => {
  return {
    // user: state.user,
    allLikedDogs: state.likedDogs.allLikedDogs,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // getMe: () => dispatch(getMe()),
    getLikedDogs: () => dispatch(getLikedDogs()),
  };
};

const LikedDogs = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default LikedDogs;
