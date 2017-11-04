import React, { Component } from 'react';
import { Platform, Text, View, Button, TextInput, Alert, FlatList, TouchableOpacity } from 'react-native';
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
      <View style={{height:'100%', width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.75)', padding: 50}}>
      <FlatList
        data={Object.keys(markers).map(key => ({ key }))}
        renderItem={({ item: { key } }) => (
          <TouchableOpacity style={{marginVertical: 2, paddingVertical: 5, backgroundColor:'#EEEEEE'}} onPress={() => this.selectMarker(key)}>
            <Text style={{textAlign:'center'}}>
              {markers[key].email}
            </Text>
          </TouchableOpacity>
        )}
      />
      </View>
    );
  }
}
