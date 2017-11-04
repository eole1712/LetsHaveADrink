import React, { Component } from 'react';
import { Platform, Text, View, Button, TextInput, Alert } from 'react-native';
import firebase from 'react-native-firebase';

import styles from './styles';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    props.navigator.setTitle({title: 'Login'})
  }

  static navigatorStyle = {
    drawUnderNavBar: true,
    navBarTranslucent: true
  };

  goToRegister = () => {
    this.props.navigator.resetTo({
      screen: 'drink.Register',
    });
  }

  login = async () => {
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
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>Email</Text>
          <TextInput onChangeText={email => this.setState({ email })} value={this.state.email} />
        </View>
        <View>
          <Text>Password</Text>
          <TextInput secureTextEntry onChangeText={password => this.setState({ password })} value={this.state.password} />
        </View>
        <Button
          title="Login"
          onPress={this.login}
        />
        <Button
          title="Register"
          onPress={this.goToRegister}
        />
      </View>
    );
  }
}
