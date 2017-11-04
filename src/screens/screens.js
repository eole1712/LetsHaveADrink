import { Navigation } from 'react-native-navigation';

import Login from './Login';
import Maps from './Maps';
import List from './List';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('drink.Login', () => Login);
  Navigation.registerComponent('drink.Map', () => Maps);
  Navigation.registerComponent('drink.List', () => List);
}