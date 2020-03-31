import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { getAllDogs } from '../store/allDogs';
import { likedDog } from '../store/likedDog';
import { removeDuplicates } from '../../utility/utils';
import axios from 'axios';

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
    await this.props.getAllDogs(this.state.page);
    this.setState({
      dogs: this.props.allDogs,
    });
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

  render() {
    const { navigation } = this.props;

    this.state.dogs = removeDuplicates(this.state.dogs);
    let dogs;
    if (this.state.dogs.length === 0) {
      dogs = this.props.allDogs;
    } else {
      dogs = this.state.dogs;
    }

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
    height: 205,
    width: 205,
  },
});
