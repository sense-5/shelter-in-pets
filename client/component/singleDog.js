import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'

class SingleDog extends Component {
  render(){
    return(
      <View style={styles.container}>
        <Text>hello single dog view here</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow'
  }
})

export default SingleDog
