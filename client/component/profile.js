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
  FlatList
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { titleCase } from '../../utility/utils';
import { getLikedDogs } from '../store/likedDog';
import axios from 'axios';

const dogImg = require('../../assets/images/dog2.jpg');

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dogs: []
    };
    this.handleLoadMore = this.handleLoadMore.bind(this);
  }

  async componentDidMount() {
    await this.props.getLikedDogs(this.state.page);
    this.setState({
      dogs: this.props.allLikedDogs
    });
  }

  async handleLoadMore() {
    await this.props.getLikedDogs();
    this.setState({
      isLoading: false,
      dogs: [...(this.state.dogs = this.props.allLikedDogs)]
    });
  }

  renderFooter = () => {
    return (
      <View>
        <ActivityIndicator animating size='large' />
      </View>
    );
  };

  render() {
    const { navigation } = this.props;
    const dogs = this.state.dogs;

    return (
      <View>
        <View>
          <Text style={styles.topHeader}>Favorited Dogs</Text>
        </View>
        {dogs.length !== 0 ? (
          <FlatList
            style={{ height: '100%' }}
            keyExtractor={item => item.id.toString()}
            data={dogs}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Single Dog', item);
                }}
              >
                <View style={styles.dogHeader}>
                  <Image
                    source={{ uri: item.photos[0].full }}
                    style={styles.dogIcon}
                  />
                  <Text style={styles.nameMain}>{titleCase(item.name)}</Text>
                </View>
                <Image
                  source={{ uri: item.photos[0].full }}
                  style={styles.image}
                />
                {item.name === 'Doggo' ? (
                  <Text style={styles.name}>Woof! Please give me a name!</Text>
                ) : (
                  <Text style={styles.name}>
                    Woof! My name is {titleCase(item.name)}!
                  </Text>
                )}
              </TouchableOpacity>
            )}
            bounces={false}
            onEndReached={() => this.handleLoadMore()}
            onEndReachedThreshold={0.2}
            ListFooterComponent={this.renderFooter}
          />
        ) : (
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>
              You have not favorited any dogs yet
            </Text>
            <TouchableOpacity
              style={styles.button2}
              onPress={() => {
                navigation.navigate('home');
              }}
            >
              <Text style={styles.buttonText}>Browse All Dogs</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textContainer: {
    //flex: 1,
    alignItems: 'center',
    //justifyContent: 'flex-start',
    marginTop: 200
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  dogContainer: {
    marginBottom: 20
  },
  image: {
    height: 350,
    width: '100%'
  },
  name: {
    fontSize: 18,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 20
  },
  nameMain: {
    fontSize: 22,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 10,
    fontWeight: 'bold'
  },
  dogHeader: {
    flexDirection: 'row',
    padding: 5
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
    width: '25%'
  },
  button2: {
    backgroundColor: 'white',
    borderColor: '#147efb',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    margin: 20,
    width: 300
  },
  buttonText: {
    color: '#147efb',
    textAlign: 'center',
    fontSize: 18
  }
});

const mapStateToProps = state => {
  return {
    // user: state.user,
    allLikedDogs: state.likedDogs.allLikedDogs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // getMe: () => dispatch(getMe()),
    getLikedDogs: () => dispatch(getLikedDogs())
  };
};

const LikedDogs = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default LikedDogs;
