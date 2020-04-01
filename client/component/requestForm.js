import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { CheckBox } from 'react-native-elements';

import { fetchRequestedDogs } from '../store/requestedAttributes';

class Request extends Component {
  constructor() {
    super();
    this.state = {
      age: {
        puppy: true,
        young: true,
        adult: true,
        senior: true
      },
      size: {
        small: true,
        medium: true,
        large: true,
        xlarge: true
      },
      coat: {
        short: true,
        medium: true,
        long: true,
        curly: true,
        wire: true
      }
    };
    this.requestedAttributes = {
      age: [],
      size: [],
      coat: []
    };
  } //end constructor

  render() {
    const age = this.state.age;
    const size = this.state.size;
    const coat = this.state.coat;

    const reqAge = this.requestedAttributes.age;
    const reqSize = this.requestedAttributes.size;
    const reqCoat = this.requestedAttributes.coat;

    return (
      <View>
        <View>
          <Text style={styles.topHeader}>Filtered Search</Text>
        </View>
        <ScrollView>
          <View style={styles.container}>
            {/* age */}
            <Text style={styles.category}>Age</Text>
            <View style={styles.boxes}>
              <CheckBox
                title='puppy'
                checked={!age.puppy}
                containerStyle={styles.checkbox}
                checkedColor={'green'}
                center={true}
                onPress={() => {
                  this.setState({
                    age: {
                      ...age,
                      puppy: !age.puppy
                    }
                  }); //end set state
                  if (age.puppy) reqAge.push('baby');
                  else {
                    const puppyIdx = reqAge.indexOf('baby');
                    reqAge.splice(puppyIdx, 1);
                  }
                }}
              />

              <CheckBox
                title='young'
                checked={!age.young}
                containerStyle={styles.checkbox}
                checkedColor={'green'}
                center={true}
                onPress={() => {
                  this.setState({
                    age: {
                      ...age,
                      young: !age.young
                    }
                  }); //end set state
                  if (age.young) reqAge.push('young');
                  else {
                    const youngIdx = reqAge.indexOf('young');
                    reqAge.splice(youngIdx, 1);
                  }
                }}
              />

              <CheckBox
                title='adult'
                checked={!age.adult}
                containerStyle={styles.checkbox}
                checkedColor={'green'}
                center={true}
                onPress={() => {
                  this.setState({
                    age: {
                      ...age,
                      adult: !age.adult
                    }
                  }); //end set state
                  if (age.adult) reqAge.push('adult');
                  else {
                    const adultIdx = reqAge.indexOf('adult');
                    reqAge.splice(adultIdx, 1);
                  }
                }}
              />

              <CheckBox
                title='senior'
                checked={!age.senior}
                containerStyle={styles.checkbox}
                checkedColor={'green'}
                center={true}
                onPress={() => {
                  this.setState({
                    age: {
                      ...age,
                      senior: !age.senior
                    }
                  }); //end set state
                  if (age.senior) reqAge.push('senior');
                  else {
                    const seniorIdx = reqAge.indexOf('senior');
                    reqAge.splice(seniorIdx, 1);
                  }
                }}
              />
            </View>

            {/* size */}
            <Text style={styles.category}>Size</Text>
            <View style={styles.boxes}>
              <CheckBox
                title='small'
                checked={!size.small}
                containerStyle={styles.checkbox}
                checkedColor={'green'}
                center={true}
                onPress={() => {
                  this.setState({
                    size: {
                      ...size,
                      small: !size.small
                    }
                  }); //end set state

                  if (size.small) reqSize.push('small');
                  else {
                    const smallIdx = reqSize.indexOf('small');
                    reqSize.splice(smallIdx, 1);
                  }
                }}
              />

              <CheckBox
                title='medium'
                checked={!size.medium}
                containerStyle={styles.checkbox}
                checkedColor={'green'}
                center={true}
                onPress={() => {
                  this.setState({
                    size: {
                      ...size,
                      medium: !size.medium
                    }
                  }); //end set state

                  if (size.medium) reqSize.push('medium');
                  else {
                    const mediumIdx = reqSize.indexOf('medium');
                    reqSize.splice(mediumIdx, 1);
                  }
                }}
              />

              <CheckBox
                title='large'
                checked={!size.large}
                containerStyle={styles.checkbox}
                checkedColor={'green'}
                center={true}
                onPress={() => {
                  this.setState({
                    size: {
                      ...size,
                      large: !size.large
                    }
                  }); //end set state

                  if (size.large) reqSize.push('large');
                  else {
                    const largeIdx = reqSize.indexOf('large');
                    reqSize.splice(largeIdx, 1);
                  }
                }}
              />

              <CheckBox
                title='xlarge'
                checked={!size.xlarge}
                containerStyle={styles.checkbox}
                checkedColor={'green'}
                center={true}
                onPress={() => {
                  this.setState({
                    size: {
                      ...size,
                      xlarge: !size.xlarge
                    }
                  }); //end set state

                  if (size.xlarge) reqSize.push('xlarge');
                  else {
                    const xlargeIdx = reqSize.indexOf('xlarge');
                    reqSize.splice(xlargeIdx, 1);
                  }
                }}
              />
            </View>

            {/* coat */}
            <Text style={styles.category}>Coat</Text>
            <View style={styles.boxes}>
              <CheckBox
                title='short'
                checked={!coat.short}
                containerStyle={styles.checkbox}
                checkedColor={'green'}
                center={true}
                onPress={() => {
                  this.setState({
                    coat: {
                      ...coat,
                      short: !coat.short
                    }
                  }); //end set state

                  if (coat.short) reqCoat.push('short');
                  else {
                    const shortIdx = reqCoat.indexOf('short');
                    reqCoat.splice(shortIdx, 1);
                  }
                }}
              />

              <CheckBox
                title='medium'
                checked={!coat.medium}
                containerStyle={styles.checkbox}
                checkedColor={'green'}
                center={true}
                onPress={() => {
                  this.setState({
                    coat: {
                      ...coat,
                      medium: !coat.medium
                    }
                  }); //end set state

                  if (coat.medium) reqCoat.push('medium');
                  else {
                    const mediumIdx = reqCoat.indexOf('medium');
                    reqCoat.splice(mediumIdx, 1);
                  }
                }}
              />

              <CheckBox
                title='long'
                checked={!coat.long}
                containerStyle={styles.checkbox}
                checkedColor={'green'}
                center={true}
                onPress={() => {
                  this.setState({
                    coat: {
                      ...coat,
                      long: !coat.long
                    }
                  }); //end set state

                  if (coat.long) reqCoat.push('long');
                  else {
                    const longIdx = reqCoat.indexOf('long');
                    reqCoat.splice(longIdx, 1);
                  }
                }}
              />

              <CheckBox
                title='curly'
                checked={!coat.curly}
                containerStyle={styles.checkbox}
                checkedColor={'green'}
                center={true}
                onPress={() => {
                  this.setState({
                    coat: {
                      ...coat,
                      curly: !coat.curly
                    }
                  }); //end set state

                  if (coat.curly) reqCoat.push('curly');
                  else {
                    const curlyIdx = reqCoat.indexOf('curly');
                    reqCoat.splice(curlyIdx, 1);
                  }
                }}
              />

              <CheckBox
                title='wire'
                checked={!coat.wire}
                containerStyle={styles.checkbox}
                checkedColor={'green'}
                center={true}
                onPress={() => {
                  this.setState({
                    coat: {
                      ...coat,
                      wire: !coat.wire
                    }
                  }); //end set state

                  if (coat.wire) reqCoat.push('wire');
                  else {
                    const wireIdx = reqCoat.indexOf('wire');
                    reqCoat.splice(wireIdx, 1);
                  }
                }}
              />
            </View>

            <TouchableOpacity
              style={styles.button2}
              onPress={() => {
                this.props.fetchRequestedDogs(this.requestedAttributes);
                this.props.navigation.navigate('Search Results')
              }}
            >
              <Text style={styles.button}>Show dogs</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50
  },
  boxes: {
    width: '90%',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    alignContent: 'center',
    marginTop: 5,
    marginBottom: 5
  },
  category: {
    backgroundColor: '#e0e0e0',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#147efb',
    width: '100%',
    padding: 15
  },
  checkbox: {
    backgroundColor: '#d5e5f5',
    width: '110%',
    padding: 15,
    alignSelf: 'center',
    margin: 5
  },
  button: {
    alignSelf: 'center',
    padding: 0,
    color: '#147efb',
    fontSize: 18
  },
  button2: {
    backgroundColor: 'white',
    borderColor: '#147efb',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    margin: 20,
    width: 200,
    marginBottom: 30
  },
  topHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#147efb',
    backgroundColor: 'white',
    padding: 10
  }
});

const mapDispatch = dispatch => ({
  fetchRequestedDogs: req => dispatch(fetchRequestedDogs(req))
});

export default connect(null, mapDispatch)(Request);
