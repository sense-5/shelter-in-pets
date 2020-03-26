import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import { connect } from 'react-redux';
import { signupAuth } from '../store/user';

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
    if (email === '') {
      alert('Email is required');
    } else if (password === '') {
      alert('Password is required');
    } else {
      await this.props.signupAuth(email, password, zipcode);
      this.setState({
        email: '',
        password: '',
        zipcode: '',
      });
      if (!this.props.user.id) {
        alert('User already exists');
      } else {
        this.props.navigation.navigate('isLoggedIn');
      }
    }
  }

  render() {
    const { email, password, zipcode } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.formWrapper}>
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
              placeholder="Enter zipcode"
              placeholderTextColor="#333"
              value={zipcode}
              onChangeText={value => this.handleChange('zipcode', value)}
            />
          </View>
          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => this.handleSignup()}
          >
            <Text style={styles.signupText}>Signup</Text>
          </TouchableOpacity>
          <Button
            title="Already a user?"
            onPress={() => this.props.navigation.navigate('login')}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.user.error,
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signupAuth: (email, password, zipcode) => {
      dispatch(signupAuth(email, password, zipcode));
    },
  };
};

const Signup = connect(mapStateToProps, mapDispatchToProps)(SignupScreen);
export default Signup;

//Style
const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formWrapper: {
    width: '80%',
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

  signupButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
  },
  signupText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
