import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  Image,
  Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import { signupAuth } from '../store/user';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

class SignupScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      zipcode: '',
      error: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleChange(name, value) {
    this.setState({
      [name]: value,
    });
  }

  async handleSignup() {
    const { email, password, zipcode } = this.state;
    const { navigation } = this.props;
    if (email === '') {
      alert('Email is required');
    } else if (password === '') {
      alert('Password is required');
    } else {
      await this.props.signupAuth(email, password, zipcode, navigation);
      this.setState({
        email: '',
        password: '',
        zipcode: '',
      });
    }
  }

  render() {
    const { email, password, zipcode } = this.state;
    const logo = require('../../assets/images/shelter-in-pets-logo.jpg');
    return (
      <View>
          <View style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.formWrapper}>
              <Image source={logo} style={styles.logo} />
              <Text style={styles.welcomeText}>Create an Account</Text>
              <View style={styles.formRow}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter email address"
                  placeholderTextColor="#333"
                  value={email}
                  onChangeText={value => this.handleChange('email', value)}
                />
              </View>
              <View style={styles.formRow}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter password"
                  placeholderTextColor="#333"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={value => this.handleChange('password', value)}
                />
              </View>
              <View style={styles.formRow}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter zipcode (optional)"
                  placeholderTextColor="#333"
                  value={zipcode}
                  onChangeText={value => this.handleChange('zipcode', value)}
                />
              </View>
            </View>
        </TouchableWithoutFeedback>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => this.handleSignup()}
          >
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>
          <Button
            title="Already a user?"
            onPress={() => this.props.navigation.navigate('login')}
          />
        </View>

          </View>


      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signupAuth: (email, password, zipcode, navigation) => {
      dispatch(signupAuth(email, password, zipcode, navigation));
    },
  };
};

const Signup = connect(mapStateToProps, mapDispatchToProps)(SignupScreen);
export default Signup;

//Style
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '50%'
  },
  logo: {
    height: 100,
    width: 100,
    marginBottom: 20,
    alignSelf: 'center',
  },
  formWrapper: {
    width: '100%',
  },
  formRow: {
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: '#ddd',
    height: 40,
    paddingHorizontal: 10,
    color: '#333',
  },
  welcomeText: {
    textAlign: 'center',
    color: '#147efb',
    marginBottom: 30,
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flex: 1,
    height: '100%',
  },
  signupButton: {
    backgroundColor: 'white',
    borderColor: '#147efb',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    margin: 20,

    width: 150,
    alignSelf: 'center',
  },
  signupText: {
    textAlign: 'center',
    color: '#147efb',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
