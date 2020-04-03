import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';

class SearchResults extends Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }
  render() {
    const dogs = this.props.reqDogs;

    return (
      <View>
        <FlatList
          numColumns={2}
          data={dogs}
          keyExtractor={item => item.key.toString()}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Single Dog', item.dog);
                }}
              >
                <Image source={{ uri: item.uri }} style={styles.image} />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 207,
    width: 207
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow'
  }
});

const mapState = state => ({
  reqDogs: state.requestedAttributes.requestedDogs
});

export default connect(mapState, null)(SearchResults);
