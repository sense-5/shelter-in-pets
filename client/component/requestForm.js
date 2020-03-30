import React, {Component} from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'
import {CheckBox} from 'react-native-elements'

class Request extends Component{
  constructor(){
    super()
    this.state = {
      age: {
        puppy: false,
        young: false,
        adult: false,
        senior: false
      }
    }
    this.requestedAttributes = {
      age: [''],
      size: [''],
      coat: ['']
    }
  }
  //when show me the dogs is clicked
    //get requests func -> loops thru the 3 objects on state, object.keys

  componentDidMount(){
    console.log('component mounted')
    console.log('state is', this.state)
  }

  componentDidUpdate(){
    //this could be where it updates obj to get dispatched
    console.log('hello update happened hi')
  }

  render(){
    const age = this.state.age;

    return(
      <View style={styles.container}>
        <View>
          {/* age */}
          <Text>Age:</Text>
          <CheckBox title="puppy" checked={age.puppy} onPress={()=>{
            console.log('puppy pressed')
            this.setState({
              age: {
                ...age,
                puppy: !age.puppy
              }
            })
          }}/>


          <CheckBox title="young" checked={age.young} onPress={()=>{
            console.log('young pressed')
            this.setState({
              age: {
                ...age,
                young: !age.young
              }
            })
          }}/>

          <CheckBox title="adult" checked={age.adult} onPress={()=>{
            console.log('ADULT pressed')
            this.setState({
              age: {
                ...age,
                adult: !age.adult
              }
            })
          }}/>

          <CheckBox title="senior" checked={age.senior} onPress={()=>{
            console.log('senior pressed')
            this.setState({
              age: {
                ...age,
                senior: !age.senior
              }
            })
          }}/>
        </View>

        <View>
          {/* size */}
          <Text>Size:</Text>
        </View>

        <View>
          {/* coat */}
          <Text>Coat:</Text>
        </View>

        <Text>hey this is the request place</Text>
        <CheckBox title="test this" checked={this.state.checked} onPress={()=>{
          console.log('pressed check box')
          console.log('state is ', this.state)

          this.setState({
            checked: !this.state.checked
          })
        }}
          />

          <Button title="Show me the doggos" />
          {/* onPress triggers fetchRequestedDogs and navigates to page?? w those dogs? or renders them here instead??? should prolly  stack navigate to new page so that if they wanna make adjustments they can just press back */}
          {/* whatever i dispatch has to be an object with age,size and coat keys and  string/array of selected values */}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Request
