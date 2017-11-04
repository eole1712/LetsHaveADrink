import { Navigation } from 'react-native-navigation';

import { registerScreens } from './src/screens/screens';

registerScreens(); // this is where you register all of your app's screens

// start the app
Navigation.startSingleScreenApp({
  screen: {
    screen: 'drink.Login', // unique ID registered with Navigation.registerScreen
    title: 'Login', // title of the screen as appears in the nav bar (optional)
  },
  animationType: 'fade' // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
});