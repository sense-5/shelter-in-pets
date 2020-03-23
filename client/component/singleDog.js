import React, {Component} from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'

function SingleDog({route}) {
  console.log('hit single dog screen')
  console.log(route.params.name)

  const name = route.params.name
  const imageUrl = route.params.imageUrl

    return(
      <View style={styles.container}>
        <Text>{name}</Text>
        <Image source={{uri: imageUrl}} style={styles.image} />
        <Text>Like button here as well?</Text>
        <Text>breed info</Text>
        <Text>shelter info</Text>
        <Text>contact link?</Text>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow'
  },
  image: {
    width: '100%',
    height: 350
  }
})

export default SingleDog
