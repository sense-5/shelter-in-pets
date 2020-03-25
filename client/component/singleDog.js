import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Linking } from 'react-native';

function SingleDog({ route }) {
  console.log('hit single dog screen');
  console.log(route.params.name);

  const name = route.params.name;
  const imageUrl = route.params.photos[0].full;
  const breed = route.params.breeds.primary;
  const description = route.params.description;
  const location = route.params.url;

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 34 }}>{name}</Text>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text>Like button here as well?</Text>
      <Text>{breed}</Text>
      <Text>{description}</Text>
      <Text style={{ color: 'blue' }} onPress={() => Linking.openURL(location)}>
        Link to Shelter
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 400,
  },
});

export default SingleDog;
