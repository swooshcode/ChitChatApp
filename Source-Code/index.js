/**
 * @format
 */

import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { firebase } from '@react-native-firebase/app';
import App from './App';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';

// Initialize Firebase
const firebaseConfig = {
  // Your Firebase config here
};
firebase.initializeApp(firebaseConfig);

// Request user permission for notifications
messaging().requestPermission().then(() => {
  console.log('Permission granted!');
}).catch(error => {
  console.log('Permission denied:', error);
});

AppRegistry.registerComponent(appName, () => App);


