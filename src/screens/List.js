import React, { Component } from 'react';
import { Platform, Text, View, Button, TextInput, Alert, FlatList, TouchableHighlight } from 'react-native';
import MapView from 'react-native-maps';
import firebase from 'react-native-firebase';

import styles from './styles';

export default class List extends Component {
  constructor(props) {
    super(props);

    props.navigator.setTitle({title: 'List of users'})
  }

  static navigatorStyle = {
    navBarTranslucent: true
  };

  selectMarker = (userId) => {
    this.props.selectMarker(userId);
    this.props.navigator.dismissModal({
      animationType: 'slide-down',
    });
  }

  render() {
    const { markers } = this.props;

    return (
      <View style={{backgroundColor: 'white'}}>
      <FlatList
        data={Object.keys(markers).map(key => ({ key }))}
        renderItem={({ item: { key } }) => (
          <TouchableHighlight onPress={() => this.selectMarker(key)}>
            <Text>
              {markers[key].email}
            </Text>
          </TouchableHighlight>
        )}
      />
      </View>
    );
  }
}
