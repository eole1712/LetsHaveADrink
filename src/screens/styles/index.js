import {
  StyleSheet,
} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
    padding: 50,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  map_container: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map_content: {
    width: '100%',
    height: '100%',    
  },
  button: {
    marginTop: 20,
  },
  noNetworkContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  noNetwork: {
    color: 'red',
  }

});
