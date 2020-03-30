import React, {Component} from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'
import {connect} from 'react-redux'
import {CheckBox} from 'react-native-elements'

import {fetchRequestedDogs} from '../store/requestedAttributes'

class Request extends Component{
  constructor(){
    super()
    this.state = {
      age: {
        puppy: true,
        young: true,
        adult: true,
        senior: true
      }
    }
    this.requestedAttributes = {
      age: [],
      size: ['medium'],
      coat: ['short']
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
    const age = this.state.age
    const size = this.state.size
    const coat = this.state.coat



  }

  render(){
    const age = this.state.age;

    return(
      <View style={styles.container}>
        <View>
          {/* age */}
          <Text>Age:</Text>
          <CheckBox title="puppy" checked={!age.puppy} onPress={()=>{
            console.log('puppy pressed')
            console.log('heres the state before we chang it ', this.state)

            this.setState({
              age: {
                ...age,
                puppy: !this.state.age.puppy
              }
            })//end set state

            console.log('heres the state AFTER', this .state)
            console.log('requested Attrs before i fook around ', this.requestedAttributes)

            if (age.puppy) this.requestedAttributes.age.push('baby')
            else {
              //puppy is falsey now
              //remove it from requstedattributes
              const puppyIdx = this.requestedAttributes.age.indexOf('baby')

              //splice the array starting at idx of item we wanna remove, and remove that one item
              this.requestedAttributes.age.splice(puppyIdx,1)
            }

            console.log('requested Attrs AFTEFTERRR ', this.requestedAttributes)

          }}/>


          <CheckBox title="young" checked={!age.young} onPress={()=>{
            console.log('young pressed')
            this.setState({
              age: {
                ...age,
                young: !age.young
              }
            })//end set state

            console.log('REQ ATTRS BBEEEEFORE ', this.requestedAttributes)
            console.log('state AFTER CHANGE pls', this.state)
            if (age.young) this.requestedAttributes.age.push('YOUNG')
            else {
              //puppy is falsey now
              //remove it from requstedattributes
              const youngIdx = this.requestedAttributes.age.indexOf('YOUNG')

              //splice the array starting at idx of item we wanna remove, and remove that one item
              this.requestedAttributes.age.splice(youngIdx,1)
            }
            console.log('REQ ATTRS AFFFTEFRER', this.requestedAttributes)

          }}/>

          <CheckBox title="adult" checked={!age.adult} onPress={()=>{
            console.log('ADULT pressed')
            this.setState({
              age: {
                ...age,
                adult: !age.adult
              }
            })//end set state

            if (age.adult) this.requestedAttributes.age.push('adult')
            else {
              //puppy is falsey now
              //remove it from requstedattributes
              const adultIdx = this.requestedAttributes.age.indexOf('adult')

              //splice the array starting at idx of item we wanna remove, and remove that one item
              this.requestedAttributes.age.splice(adultIdx,1)
            }
          }}/>

          <CheckBox title="senior" checked={!age.senior} onPress={()=>{
            console.log('senior pressed')
            this.setState({
              age: {
                ...age,
                senior: !age.senior
              }
            })//end set state

            if (age.senior) this.requestedAttributes.age.push('senior')
            else {
              //puppy is falsey now
              //remove it from requstedattributes
              const seniorIdx = this.requestedAttributes.age.indexOf('senior')

              //splice the array starting at idx of item we wanna remove, and remove that one item
              this.requestedAttributes.age.splice(seniorIdx,1)
            }

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

          <Button title="Show me the doggos" onPress={()=>{
            this.props.fetchRequestedDogs(this.requestedAttributes)
            }}
          />
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

const mapDispatch = dispatch => ({
  fetchRequestedDogs: (req) => dispatch(fetchRequestedDogs(req))
})

// export default Request

export default connect(null, mapDispatch)(Request)
