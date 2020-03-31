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
        <View>
          <Text style={styles.topHeader}>Confirming Search</Text>
        </View>
        <View>
          <Text style={styles.topText}>
            Are you looking for any of these pups?
          </Text>
          <FlatList
            keyExtractor={({ item, key }) => key.toString()}
            data={this.state.breedOptions}
            style={styles.flatlist}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    justifyContent: 'flex-start'
    //marginBottom: 50
  },

  button: {
    justifyContent: 'center',
    //marginTop: 5,
    marginBottom: 5
    //padding: 2,
  },
  topText: {
    color: '#147efb',
    backgroundColor: '#e0e0e0',
    fontWeight: 'bold',
    padding: 10,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 5
  },
  topHeader: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#147efb',
    backgroundColor: 'white',
    padding: 10
  },
  text: {
    backgroundColor: '#d5e5f5',
    color: 'grey', //'#514D59' //'147efb'
    textAlign: 'center',
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
    width: '100%',
    alignSelf: 'center'
  },
  flatlist: {
    marginBottom: '20%'
  }
});
