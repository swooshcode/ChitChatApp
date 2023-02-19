import React from 'react';
import {View, Text, SafeAreaView, StatusBar} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Setting from '../screens/Setting/Setting';
import QRcode from '../screens/QRcode/QRcode';
const Stack = createNativeStackNavigator();
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const SettingStack = () => {
  const insets = useSafeAreaInsets()
  
  return (
    <View style={{flex: 1}}>
      <View>
        {Platform.OS === 'ios' ? (
          <StatusBar barStyle="dark-content" />
        ) : (
          <StatusBar
            barStyle="dark-content"
            // backgroundColor={Theme.lightGrey}
          />
        )}
      </View>

      <Stack.Navigator
        initialRouteName="Setting"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="QRcode" component={QRcode} />
      </Stack.Navigator>
    </View>
  );
};

export default SettingStack;
