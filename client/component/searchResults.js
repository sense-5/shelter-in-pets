import React, {Component} from 'react'
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux'
const defaultDog = require('../../assets/images/dog1.png')

class SearchResults extends Component {
  render(){
    const dogs = this.props.reqDogs

    return(
      <View>
        <FlatList
            numColumns={2}
            data={dogs}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View>

                {console.log('hello here is item', item)}
                {console.log('PHOTO', item.photos)}

                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('Single Dog', item);
                  }}
                >
                {item.photos.length ?  (
                  <Image source={{ uri: item.photos[0].full }} style={styles.image} />
                ) : (
                  <Image source={defaultDog} style={styles.image} onPress={() => {
                    this.props.navigation.navigate('Single Dog', item);
                  }} />
                )
                }
                </TouchableOpacity>
              </View>
            )}
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    height: 205,
    width: 205,
  },
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "yellow"
  },
});

const mapState = state => ({
  reqDogs: state.requestedAttributes.requestedDogs
})

export default connect(mapState, null)(SearchResults)
