import {
  StackNavigator,
} from 'react-native-navigation';

import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';

const App = StackNavigator({
  Login: { screen: LoginScreen },
  Register: { screen: RegisterScreen },
});

export default App;
