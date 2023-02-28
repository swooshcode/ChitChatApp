import messaging from '@react-native-firebase/messaging';

// Handle incoming notifications
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Received background message: ', remoteMessage);
});

// Handle user tapping on notification
messaging().onNotificationOpenedApp(remoteMessage => {
  console.log('User tapped notification: ', remoteMessage);
});
