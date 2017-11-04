import React, { Component } from 'react';
import { Platform, Text, View, Button, TextInput, Alert } from 'react-native';
import MapView from 'react-native-maps';
import firebase from 'react-native-firebase';
import { withNetworkConnectivity } from 'react-native-offline';

import NoNetwork from './NoNetwork'

import styles from './styles';

class Maps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      token: props.token,
      position: {
        latitude: 0,
        longitude: 0,
      },
      markers: {},
    };

    props.navigator.setButtons({
      rightButtons: [
        {
          title: 'List users', 
          id: 'listUsers', 
          buttonColor: 'green', 
          buttonFontSize: 14, 
          buttonFontWeight: '600', 
        },
      ]
    });

    props.navigator.setOnNavigatorEvent(this.showModal);    

    props.navigator.setTitle({title: 'Maps'});
  }

  showModal = (event) => {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'listUsers') {
        this.props.navigator.showModal({
          screen: 'drink.List',
          title: 'List users',
          passProps: {
            markers: this.state.markers,
            selectMarker: id => this.setState({
              position: {
                latitude: this.state.markers[id].latitude,
                longitude: this.state.markers[id].longitude,
              },
            })
          },
        })
      }
    }
  }

  updatePosition = (param) => {
    console.log(param);
    if (param && param.coords) {
      this.ref.update({
        now: param.timestamp,
        email: this.state.user.email,
        latitude: param.coords.latitude,
        longitude: param.coords.longitude,
      });
    }
  }

  componentDidMount() {
    firebase.database().goOnline();
    this.ref = firebase.database().ref(this.state.user.uid);

    navigator.geolocation.getCurrentPosition(param =>
      this.setState({ position: { 
        latitude: param.coords.latitude,
        longitude: param.coords.longitude,
      }}),
    );
    navigator.geolocation.getCurrentPosition(this.updatePosition);

    this.watchId = navigator.geolocation.watchPosition(this.updatePosition, null, {
      enableHighAccuracy: true,
    });
    firebase.database().ref().on('value', res => {
      this.setState(oldState => ({ markers: { ...oldState.markers, ...res._value }}))
    })
  }

  componentWillUnmount() {
    firebase.database().goOffline();
    if (this.watchId) {
      navigator.geolocation.clearWatch(this.watchId);
    }
  }

  static navigatorStyle = {
    navBarTranslucent: true,
    drawUnderNavBar: true,
  };

  render() {
    const Markers = Object.keys(this.state.markers).map(id => {
      console.log(id, this.state.markers[id]);
      return (
        <MapView.Marker.Animated coordinate={{ latitude: this.state.markers[id].latitude, longitude: this.state.markers[id].longitude }} key={id}/>
      );
    });
    console.log(this.props);

    const map = (
      <MapView
        style={styles.map_content}
        region={{
          latitude: this.state.position.latitude,
          longitude: this.state.position.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        {Markers}
      </MapView>
    );

    return (
      <View style ={styles.map_container}>
        {map}
      </View>
    );
  }
}

export default withNetworkConnectivity({
  checkConnectionInterval: 5000,
})(Maps);
