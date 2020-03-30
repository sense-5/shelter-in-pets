import React, {Component} from 'react'
import {View, Text, StyleSheet, Button, ScrollView} from 'react-native'
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
      },
      size: {
        small: true,
        medium: true,
        large: true,
        xlarge: true
      },
      coat: {}
    }
    this.requestedAttributes = {
      age: [],
      size: [],
      coat: []
    }
  }//end constructor

  componentDidMount(){
    console.log('component mounted')
  }

  componentDidUpdate(){
    console.log('hello update happened hi')
  }

  render(){
    const age = this.state.age
    const size = this.state.size
    const coat = this.state.coat

    const reqAge = this.requestedAttributes.age
    const reqSize = this.requestedAttributes.size
    const reqCoat = this.requestedAttributes.coat


    return(
      <ScrollView>
      <View style={styles.container}>
        <View>
          {/* age */}
          <Text>Age:</Text>
          <CheckBox title="puppy" checked={!age.puppy} onPress={()=>{
            this.setState({
              age: {
                ...age,
                puppy: !age.puppy
              }
            })//end set state
            if (age.puppy) reqAge.push('baby')
            else {
              const puppyIdx = reqAge.indexOf('baby')
              reqAge.splice(puppyIdx, 1)
            }
          }}/>

          <CheckBox title="young" checked={!age.young} onPress={()=>{
            this.setState({
              age: {
                ...age,
                young: !age.young
              }
            })//end set state
            if (age.young) reqAge.push('young')
            else {
              const youngIdx = reqAge.indexOf('young')
              reqAge.splice(youngIdx, 1)
            }
          }}/>

          <CheckBox title="adult" checked={!age.adult} onPress={()=>{
            this.setState({
              age: {
                ...age,
                adult: !age.adult
              }
            })//end set state
            if (age.adult) reqAge.push('adult')
            else {
              const adultIdx = reqAge.indexOf('adult')
              reqAge.splice(adultIdx, 1)
            }
          }}/>

          <CheckBox title="senior" checked={!age.senior} onPress={() => {
            this.setState({
              age: {
                ...age,
                senior: !age.senior
              }
            })//end set state
            if (age.senior) reqAge.push('senior')
            else {
              const seniorIdx = reqAge.indexOf('senior')
              reqAge.splice(seniorIdx, 1)
            }
          }}/>
        </View>

        <View>
          {/* size */}
          <Text>Size:</Text>

          <CheckBox title="small" checked={!size.small} onPress={() => {
            this.setState({
              size: {
                ...size,
                small: !size.small
              }
            })//end set state

            if(size.small) reqSize.push('small')
            else {
              const smallIdx = reqSize.indexOf('small')
              reqSize.splice(smallIdx, 1)
            }
          }} />

          <CheckBox title="medium" checked={!size.medium} onPress={()=> {
            this.setState({
              size: {
                ...size,
                medium: !size.medium
              }
            })//end set state

            if(size.medium) reqSize.push('medium')
            else {
              const mediumIdx = reqSize.indexOf('medium')
              reqSize.splice(mediumIdx, 1)
            }
          }} />

          <CheckBox title="large" checked={!size.large} onPress={()=> {
            this.setState({
              size: {
                ...size,
                large: !size.large
              }
            })//end set state

            if(size.large) reqSize.push('large')
            else {
              const largeIdx = reqSize.indexOf('large')
              reqSize.splice(largeIdx, 1)
            }
          }} />

          <CheckBox title="xlarge" checked={!size.xlarge} onPress={()=> {
            this.setState({
              size: {
                ...size,
                xlarge: !size.xlarge
              }
            })//end set state

            if(size.xlarge) reqSize.push('xlarge')
            else {
              const xlargeIdx = reqSize.indexOf('xlarge')
              reqSize.splice(xlargeIdx, 1)
            }
          }} />
        </View>

        <View>
          {/* coat */}
          <Text>Coat:</Text>
        </View>

          <Button title="Show me the doggos" onPress={()=>{
            this.props.fetchRequestedDogs(this.requestedAttributes)
            }}
          />
          {/* onPress triggers fetchRequestedDogs and navigates to page?? w those dogs? or renders them here instead??? should prolly  stack navigate to new page so that if they wanna make adjustments they can just press back */}
          {/* whatever i dispatch has to be an object with age,size and coat keys and  string/array of selected values */}

      </View>
      </ScrollView>
      // scrollview for testing purps before formatting is fixed
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
