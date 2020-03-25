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
  const defaultImageUrl =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS07bU3_0rUVJ9_zj5L78h_3D1aKr4gq1RkZ9YhjEmLLvieGERn';

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 34 }}>{name}</Text>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <Image source={{ uri: defaultImageUrl }} style={styles.image} />
      )}
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
