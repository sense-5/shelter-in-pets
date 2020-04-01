import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux'
import {gotRequestedDogs} from '../store/requestedAttributes'
import AllDogs from './allDogs'
const defaultDog = require('../../assets/images/dog1.png')
// import { fetchRequestedDogs } from '../store/requestedAttributes';

class SearchResults extends Component {
  render(){
    console.log('searCH RESULTS RENDER')
    const dogs = this.props.reqDogs

    return(
      <View>
         {/* <AllDogs navigation={this.props.navigation} allDogs={dogs}/> */}
        {/* <Text>search results</Text> */}
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
                  // this.view(item.dog);
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

// const mapDispatch = dispatch => ({
//   fetchRequestedDogs: (req) => dispatch(fetchRequestedDogs(req))
// })

export default connect(mapState, null)(SearchResults)
// export default SearchResults
