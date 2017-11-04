import React, { Component } from 'react';
import { Platform, Text, View, Button, TextInput, Alert } from 'react-native';
import firebase from 'react-native-firebase';
import { withNetworkConnectivity } from 'react-native-offline';

import NoNetwork from './NoNetwork'

import styles from './styles';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isLogingIn: false,
    };

    props.navigator.setTitle({title: 'Login or Register'})
  }

  static navigatorStyle = {
    navBarTranslucent: true,
    drawUnderNavBar: true,    
  };

  register = async () => {
    if (this.state.isLogingIn) {
      return null;
    }
    
    this.setState({ isLogingIn: true });
    
    await (async ()  => {
      const { email, password } = this.state;

      if (!email.length || !password.length) {
        return null;
      }
      let user
      try {
        user = await firebase.auth().createUserWithEmailAndPassword(email, password);
        if (user) {
          this.props.navigator.resetTo({
            screen: 'drink.Map',
            passProps: {
              user: user.toJSON(),
              token: await user.getIdToken(),
            },
          });
        }
      } catch (error) {
        Alert.alert(
          'Error on register',
          error.message,
        );
        this.setState({ password: '' });
      }
    })();
    this.setState({ isLogingIn: false });
  }

  login = async () => {
    if (this.state.isLogingIn) {
      return null;
    }
    
    this.setState({ isLogingIn: true });
    
    await (async ()  => {
      const { email, password } = this.state;

      if (!email.length || !password.length) {
        return null;
      }
      let user;
      try {
        user = await firebase.auth().signInWithEmailAndPassword(email, password);
        if (user) {
          this.props.navigator.resetTo({
            screen: 'drink.Map',
            passProps: {
              user: user.toJSON(),
              token: await user.getIdToken(),
            },
          });
        }
      } catch (error) {
        Alert.alert(
          'Error on login',
          error.message,
        );
        this.setState({ password: '' });
      }
      console.log(user);
    })();
    this.setState({ isLogingIn: false });
  }

  render() {
    const RESULT = (
      <View>
        <View>
          <Text>Email</Text>
          <TextInput onChangeText={email => this.setState({ email })} value={this.state.email} />
        </View>
        <View>
          <Text>Password</Text>
          <TextInput secureTextEntry onChangeText={password => this.setState({ password })} value={this.state.password} />
        </View>
        <View style={styles.button}>
          <Button
            title="Login"
            onPress={this.login}
            disabled={this.state.isLogingIn}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Register"
            onPress={this.register}
            disabled={this.state.isLogingIn}
          />
        </View>
      </View>
    );
    return (
      <View style={styles.container}>
        { this.props.isConnected ? RESULT : (<NoNetwork />) }
      </View>
    );
  }
}

export default withNetworkConnectivity({
  checkConnectionInterval: 5000,
})(Login);