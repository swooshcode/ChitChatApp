import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import appTheme from '../../constants/theme';

export default function ButtonComponent(props) {
  const {onPress, label} = props;
  return (
    <LinearGradient
      start={{x: 1, y: 1}}
      end={{x: 0, y: 1}}
      colors={props.colors ? props.colors : ['#47A4ED', '#108DA6']}
      style={[styles.linearGradient, props.style]}>
      <TouchableOpacity
        disabled={props.disabled}
        style={[styles.buttonBg, props.BgButton]}
        onPress={onPress}>
        <Text style={[appTheme.FONTS.h3, {color: 'white', textAlign:'center'}]}>{label}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  linearGradient: {
    borderRadius: 18,
    margin: 15,
  },
  buttonBg: {
    padding: 10,
    width: appTheme.ALIGNMENT.wp('70%'),
    height: appTheme.ALIGNMENT.hp(7),
    alignItems: 'center',
    justifyContent: 'center',
   
  },
});
