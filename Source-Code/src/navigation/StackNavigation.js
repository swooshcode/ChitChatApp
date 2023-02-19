import React from 'react';
import { View, Text, SafeAreaView, StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Call from '../screens/Call/Call';
import Message from '../screens/Message/Message';
import Setting from '../screens/Setting/Setting';
import Bottom from './BottomNavigation';
import VideoCall from '../screens/videoCall/VideoCall';
import QRcode from '../screens/QRcode/QRcode';
import Signup from '../screens/Signup/Signup';
import Login from '../screens/Login/Login';
import Verify from '../screens/VerifyPhone/Verify'
import { Chat } from '@screens/Chat/Chat';
import PhoneCall from '../screens/phoneCall/PhoneCall';
import Status from '../screens/Status/Status';
const Stack = createNativeStackNavigator();
//Screens Imported
import auth from '@react-native-firebase/auth';
import { People } from '../screens/People/People';
import { inlineStyles } from 'react-native-svg';

const Navigation = ({ navigation }) => {
  const insets = useSafeAreaInsets()
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState();
  function onAuthStateChanged(user) {

    if (user){
      if(user.photoURL == null){
        navigation.navigate('Signup')
      }else{
        navigation.navigate('Bottom');
      }
    }
    setUser(user);
    if (initializing) setInitializing(false);
  }
  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  // React.useEffect(() => {
  //   if (user) {
  //     navigation.navigate("Bottom")
  //   }
  // }, [user])
  return (
    <View style={{ flex: 1, paddingRight: insets.right, paddingLeft: insets.left }}>
      <View>
        {Platform.OS === 'ios' ? (
          <StatusBar barStyle="dark-content" />
        ) : (
          <StatusBar barStyle="dark-content" />
        )}
      </View>

      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Verify" component={Verify} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Bottom" component={Bottom} />
        <Stack.Screen name="Call" component={Call} />
        <Stack.Screen name="Message" component={Message} />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="VideoCall" component={VideoCall} />
        <Stack.Screen name="PhoneCall" component={PhoneCall} />
        <Stack.Screen name="QRcode" component={QRcode} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Status" component={Status} />
        <Stack.Screen name="people" component={People} />
      </Stack.Navigator>
    </View>
  );
};

export default Navigation;
