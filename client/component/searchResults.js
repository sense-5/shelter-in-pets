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
// import {gotRequestedDogs} from '../store/requestedAttributes'
// import AllDogs from './allDogs'
import { fetchRequestedDogs } from '../store/requestedAttributes';

class SearchResults extends Component {
  // constructor(){
  //   super()
  //   // this.state = {
  //   //   dogs: []
  //   // }
  // }

  componentDidMount(){
    console.log('mounted search results hi')
    // console.log('route params are ', this.props.route.params.attributes)
    const attributes = this.props.route.params.attributes

    fetchRequestedDogs(attributes)
  }

  render(){
    console.log('searCH RESULTS RENDER')
    const dogs = this.props.reqDogs

    return(
      <View style={styles.container}>
        {/* <AllDogs navigation={this.props.navigation} allDogs={this.state.dogs}/> */}
        {/* <Text>hey search results here</Text> */}

        {dogs ? (
          <FlatList
            style={{ height: '100%' }}
            numColumns={2}
            // keyExtractor={({ item: dogs,  }) => item.toString()}
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
            // onEndReached={() => this.handleLoadMore()}
            // onEndReachedThreshold={0.2}
            ListFooterComponent={this.renderFooter}
          />
        ) : (
          <Text>Loading Doggos ...</Text>
        )
        }
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

const mapDispatch = dispatch => ({
  fetchRequestedDogs: (req) => dispatch(fetchRequestedDogs(req))
})

export default connect(mapState, mapDispatch)(SearchResults)
// export default SearchResults
