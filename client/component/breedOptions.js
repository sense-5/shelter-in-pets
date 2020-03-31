import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { getBreedOptions } from '../../utility/prediction';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class BreedOptions extends React.Component {
  constructor() {
    super();
    this.state = {
      breedOptions: []
    };
  }

  componentDidMount() {
    let { breeds } = this.props.route.params;
    const { dogBreed } = this.props.route.params;
    this.setState({
      breedOptions: getBreedOptions(breeds, dogBreed)
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.topText}>Just to be sure...</Text>
        <Text style={styles.topText2}>
          Are you looking for any of these pups?
        </Text>
        <FlatList
          keyExtractor={({ item, key }) => key.toString()}
          data={this.state.breedOptions}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate('Dogs By Breed', item.name)
              }
            >
              <Text style={styles.text}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: '5%'
  },

  button: {
    justifyContent: 'center',
    padding: 2
  },
  topText: {
    color: '#147efb',
    fontWeight: 'bold',
    padding: 10,
    fontSize: 20,
    textAlign: 'center'
  },
  topText2: {
    color: '#147efb',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 25
  },
  text: {
    backgroundColor: '#147efb', //'#514D59'
    textAlign: 'center',
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    width: '100%',
    alignSelf: 'center'
  }
});
