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
      coat: {
        short: true,
        medium: true,
        long: true,
        curly: true,
        wire: true
      }
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
        {/* <View style={styles.ageContainer}> */}
          {/* age */}
          <Text>Age:</Text>
          <View style={styles.boxes}>
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
        {/* </View> */}

        {/* <View> */}
          {/* size */}
          <Text>Size:</Text>

          <View style={styles.boxes}>
          <CheckBox title="small" checked={!size.small}
            style={styles.option}
            onPress={() => {
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
        {/* </View> */}

        {/* <View> */}
          {/* coat */}
          <Text>Coat:</Text>

          {/* short */}
          <View style={styles.boxes}>
          <CheckBox title="short" checked={!coat.short} onPress={()=> {
            this.setState({
              coat: {
                ...coat,
                short: !coat.short
              }
            })//end set state

            if(coat.short) reqCoat.push('short')
            else {
              const shortIdx = reqCoat.indexOf('short')
              reqCoat.splice(shortIdx, 1)
            }
          }} />

          {/* medium */}
          <CheckBox title="medium" checked={!coat.medium} onPress={()=> {
            this.setState({
              coat: {
                ...coat,
                medium: !coat.medium
              }
            })//end set state

            if(coat.medium) reqCoat.push('medium')
            else {
              const mediumIdx = reqCoat.indexOf('medium')
              reqCoat.splice(mediumIdx, 1)
            }
          }} />

          {/* long */}
          <CheckBox title="long" checked={!coat.long} onPress={()=> {
            this.setState({
              coat: {
                ...coat,
                long: !coat.long
              }
            })//end set state

            if(coat.long) reqCoat.push('long')
            else {
              const longIdx = reqCoat.indexOf('long')
              reqCoat.splice(longIdx, 1)
            }
          }} />

          {/* curly */}
          <CheckBox title="curly" checked={!coat.curly} onPress={()=> {
            this.setState({
              coat: {
                ...coat,
                curly: !coat.curly
              }
            })//end set state

            if(coat.curly) reqCoat.push('curly')
            else {
              const curlyIdx = reqCoat.indexOf('curly')
              reqCoat.splice(curlyIdx, 1)
            }
          }} />

          {/* wire */}
          <CheckBox title="wire" checked={!coat.wire} onPress={()=> {
            this.setState({
              coat: {
                ...coat,
                wire: !coat.wire
              }
            })//end set state

            if(coat.wire) reqCoat.push('wire')
            else {
              const wireIdx = reqCoat.indexOf('wire')
              reqCoat.splice(wireIdx, 1)
            }
          }} />

        </View>
        {/* </View> */}

          <Button title="Show me the doggos" onPress={()=>{
            this.props.fetchRequestedDogs(this.requestedAttributes)
            }}
          />

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
  },
  ageContainer: {
    backgroundColor: 'yellow'
  },
  boxes: {
    // backgroundColor: 'yellow',
    width: '80%',
    justifyContent: 'space-evenly',
    alignSelf: 'center'
  },
})

const mapDispatch = dispatch => ({
  fetchRequestedDogs: (req) => dispatch(fetchRequestedDogs(req))
})

// export default Request

export default connect(null, mapDispatch)(Request)
