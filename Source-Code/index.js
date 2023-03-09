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
  apiKey: "AIzaSyDdl1Y6csCHcWeG-2Ij4s3rgoDjU10o6D8",
  authDomain: "chitchat-ab74c.firebaseapp.com",
  databaseURL: "https://chitchat-ab74c-default-rtdb.firebaseio.com",
  projectId: "chitchat-ab74c",
  storageBucket: "chitchat-ab74c.appspot.com",
  messagingSenderId: "67212759619",
  appId: "1:67212759619:web:877146c2c993315a94baf6",
  measurementId: "G-VN4M7Q90L8"
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


