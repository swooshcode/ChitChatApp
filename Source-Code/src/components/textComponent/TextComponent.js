import React from 'react';
import {StyleSheet, Text} from 'react-native';
import appTheme from '@constants/theme';
import {LinearTextGradient} from 'react-native-text-gradient';

export default function TextComponent(props) {
  const {heading, normal, LabelText, colored, title, style, time} = props;
  return (
    <>
      {heading === true ? (
        <Text style={[appTheme.FONTS.h1, {margin: 10}, style]}>
          {props.label}
        </Text>
      ) : normal === true ? (
        <Text
          style={[
            appTheme.FONTS.h3,
            {color: 'black', textDecorationLine: 'underline'},
            style,
          ]}>
          {props.label}
        </Text>
      ) : title === true ? (
        <Text numberOfLines={2} style={[styles.title, style]}>{props.label}</Text>
      ) : colored === true ? (
        <LinearTextGradient
          style={[styles.coloredTxt, style]}
          locations={[0, 1]}
          colors={['#108DA6', '#47A4ED']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <Text>{props.label}</Text>
        </LinearTextGradient>
      ) : LabelText === true ? (
        <Text style={[styles.labelTxt, style]}>{props.label}</Text>
      ) : time === true ? (
        <Text style={[styles.time, style]}>{props.label}</Text>
      ) : null}
    </>
  );
}
const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-Bold',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 27,
    letterSpacing: 0.02,
    color: '#474747',
  },
  coloredTxt: {
    fontFamily: 'Poppins-Bold',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    // lineHeight: 27,
    letterSpacing: 0.02,
  },
  labelTxt: {
    fontFamily: 'Poppins-Bold',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 0.02,
    textTransform: 'uppercase',
    color: '#A2A2A2',
  },
  time: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 0.02,
    color: '#474747',
  },
});
