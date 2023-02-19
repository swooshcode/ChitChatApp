import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Call from '../screens/Call/Call';
import Message from '../screens/Message/Message';
import Setting from '../screens/Setting/Setting';
import SettingStack from './SettingStack';
import Images from '../Utils/Images';

const Tab = createBottomTabNavigator();

const Bottom = () => {
  return (
    <Tab.Navigator
      initialRouteName="Message"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 45,
          backgroundColor: 'white',
          borderTopLeftRadius: 45,
          borderTopRightRadius: 45,
          height: 75,
          width: 300,
          alignSelf: 'center',
        },
      }}
      tabBarShowLabel={false}>
      <Tab.Screen
        name="Call"
        component={Call}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  // borderRadius: 10,
                  borderBottomColor: 'skyblue',
                  borderBottomWidth: 4,
                }}>

                <Image
                  style={{ height: 30, width: 30, marginBottom: 8 }}
                  source={Images.blueCall}
                />
              </View>
            ) : (
              <Image
                style={{ height: 30, width: 30 }}
                source={Images.phoneCall}
              />
            ),
        }}
      />

      <Tab.Screen
        name="Message"
        component={Message}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomColor: 'skyblue',
                  borderBottomWidth: 4,
                }}>
                <Image
                  style={{ height: 30, width: 30, marginBottom: 8 }}
                  source={Images.blueMsg}
                />
              </View>
            ) : (
              <Image style={{ height: 30, width: 30 }} source={Images.greyMsg} />
            ),
        }}
      />

      <Tab.Screen
        name="Setting"
        component={SettingStack}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View
                style={{
                  // backgroundColor: 'white',
                  // height: 50,
                  // width: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  // position: 'absolute',
                  // bottom: 30,
                  // borderRadius: 10,
                  // elevation: 10,
                  borderBottomColor: 'skyblue',
                  borderBottomWidth: 4,
                  // marginTop: 10,
                }}>
                <Image
                  style={{ height: 30, width: 30, marginBottom: 8 }}
                  source={Images.blueProfilePic}
                />
              </View>
            ) : (
              <Image
                style={{ height: 30, width: 30 }}
                source={Images.profilePic}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
};
export default Bottom;
