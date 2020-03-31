import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux'
// import {gotRequestedDogs} from '../store/requestedAttributes'
import AllDogs from './allDogs'

class SearchResults extends Component {
  constructor(){
    super()
    this.state = {
      dogs: []
    }
  }

  async componentDidMount(){
    console.log('mounted hi')
    console.log('reqDogs props are ', this.props.reqDogs)

    // await this.props.fetchRequestedDogs()
    await this.setState({
      dogs: this.props.reqDogs
    })

    console.log('this STAAATE', this.state)
  }

  render(){
    console.log('searCH RESULTS RENDER')
    const dogs = this.props.reqDogs

    return(
      <View>
        <AllDogs navigation={this.props.navigation} dogs={this.state.dogs}/>
        {/* <Text>hey search results here</Text> */}

        {/* {dogs ? (
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
            // onEndReached={() => this.handleLoadMore()}
            // onEndReachedThreshold={0.2}
            ListFooterComponent={this.renderFooter}
          />
        ) : (
          <Text>Loading Doggos ...</Text>
        )
        } */}
      </View>
    )
  }
}

const mapState = state => ({
  reqDogs: state.requestedAttributes.requestedDogs
})

// const mapDispatch = dispatch => ({
//   fetchRequestedDogs: (req) => dispatch(fetchRequestedDogs(req))
// })

export default connect(mapState, null)(SearchResults)
