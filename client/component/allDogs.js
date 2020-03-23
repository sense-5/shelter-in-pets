import React, {Component} from 'react'
import {View, Text, Stylesheet, StyleSheet, ScrollView, Image} from 'react-native'



const dummyData = [
  {id: 1,
  name: 'Rover',
  imageUrl: 'https://www.nationalgeographic.com/content/dam/animals/thumbs/rights-exempt/mammals/d/domestic-dog_thumb.jpg',
  },
  {id: 2,
  name: 'Buddy',
  imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Rusty.jpg/1200px-Rusty.jpg',
  },
  {id: 3,
  name: 'Zeke',
  imageUrl: 'https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2019/02/dog-451643.jpg?h=bf654dbc&itok=MQGvBmuo',
  },
  {id: 4,
    name: 'Mango',
    imageUrl: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/09/04/13/istock-1031307988.jpg?w968h681',
  },
  {id: 5,
    name: 'Wiggles',
    imageUrl: 'https://media4.s-nbcnews.com/j/newscms/2019_23/2885811/190606-border-collie-mc-1318_5b1706791f4ae9ddb3029540a98f7e08.fit-760w.JPG',
  },
]

class AllDogs extends Component {
  render(){
    return(
      <View >
       <ScrollView>
          {/* <Text>hello all dogs here yes yes hello hello great many dog dog dog</Text> */}
          {dummyData.map(dog => {
            return(
              <View key={dog.id} style={styles.dogContainer}>
                <View style={{flexDirection:'row'}}>
                  <Image source={{uri: dog.imageUrl}} style={styles.dogIcon}/>
                  <Text style={styles.name}>{dog.name}</Text>
                </View>
                <Image source={{uri: dog.imageUrl}} style={styles.image} />
              </View>
            )
          })}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  dogContainer: {
    backgroundColor: 'yellow',
    marginBottom: 20
  },
  image: {
    height: 350,
    width: '100%'
  },
  name: {
    fontSize: 20,
    padding: 5
  },
  dogIcon: {
    width: 30,
    height: 30,
    borderRadius: 50,
    padding: 5
  }
})

export default AllDogs
