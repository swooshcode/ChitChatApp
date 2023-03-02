/**
 * @format
 */

import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import * as firebase from 'firebase';
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
async function requestPermission(){
  try {
    await messaging().requestPermission();
    console.log('Permission granted!');
  } catch (error) {
    console.log('Permission denied:', error);  
  } 
}

AppRegistry.registerComponent(appName, () => App);


