import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen'
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

const RootStack = createNativeStackNavigator();

import Navigation from './src/navigation/StackNavigation';
import {CounterProvider} from './src/context/ContextApi';

function App() {
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState();
  function onAuthStateChanged(user) {
    console.log(user, 'were logged in.. app')
    setUser(user);
    if (initializing) setInitializing(false);
  }


  React.useEffect(() => {
    SplashScreen.hide()
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <>
      <CounterProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <RootStack.Navigator
              headerMode="none"
              screenOptions={{
                headerShown: false,
              }}>
              <RootStack.Screen name="Navigation" component={Navigation} />
            </RootStack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </CounterProvider>
    </>
  );
}

export default App;


