import React, {Component} from 'react'
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import {withNavigation} from 'react-navigation';

import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SingleDog from './singleDog';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

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
  constructor(){
    super()
  }

  like(e){
    console.log('liked')
    //function to add dog to user's liked dogs
    //if dog is already there remove it (un-like)
    console.log(e.nativeEvent)

    //ios-heart --> icon name when dog is liked
  }

  dogProfile(){
    //navigate to dog profile? or just pull it up? tbd
    console.log('dog prof')
  }



  render(){
    const { navigation } = this.props

    return(
      <View >
       <ScrollView>
          {dummyData.map(dog => {
            return(
              <View key={dog.id} style={styles.dogContainer}>

                <TouchableWithoutFeedback onPress={()=>{
                  navigation.navigate('Single Dog')
                }}>


                  <View style={styles.dogHeader} onPress={this.dogProfile}>
                    <Image source={{uri: dog.imageUrl}} style={styles.dogIcon}/>
                    <Text style={styles.name}>{dog.name}</Text>
                  </View>
                </TouchableWithoutFeedback>

                <Image source={{uri: dog.imageUrl}} style={styles.image} />
                <View style={styles.dogFooter}>
                  <Ionicons name={'ios-heart-empty'} size={30} onPress={this.like} />
                  {/* icon for liked dogs below */}
                  {/* <Ionicons name={'ios-heart'} size={30} onPress={this.like} color={'#de104a'}/> */}
                  <Ionicons name={'ios-mail'} size={30} onPress={this.likeSwitch} />
                </View>

              </View>
            )
          })}
        </ScrollView>
      </View>
    )
  }
}

function DogsStackScreen(){
  <Stack.Navigator headerMode="screen">

    <Stack.Screen name="All Dogs" component={AllDogs} />

    <Stack.Screen
      name="Single Dog"
      component={SingleDog}
      options={({navigation}) => ({
        headerTitle: 'hey',
        headerLeft: () => (
          <Button onPress={()=> {
            navigation.navigate('All Dogs')
          }}
          title="back"
          />
        )
      })}
      />

 </Stack.Navigator>
}

const styles = StyleSheet.create({
  dogContainer: {
    // backgroundColor: 'yellow',
    marginBottom: 20
  },
  image: {
    height: 350,
    width: '100%'
  },
  name: {
    fontSize: 18,
    padding: 5
  },
  dogIcon: {
    width: 30,
    height: 30,
    borderRadius: 50,
    padding: 5
  },
  dogHeader: {
    flexDirection:'row',
    padding: 5
  },
  dogFooter: {
    flexDirection: 'row',
    // backgroundColor: 'pink',
    justifyContent: 'space-around',
    padding: 8,
    width: '25%'
  }
})

export default AllDogs

// export default withNavigation(AllDogs);
