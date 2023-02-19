import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import appTheme from '../../constants/theme';

export default function InputComponent(props) {
  const { placeholder, onChangeText, value, secureTextEntry, keyboardType } = props;
  return (
    <TextInput
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      placeholderTextColor={'#AEAEAE'}
      style={[styles.inputText, props.style]}
    />
  )
}
const styles = StyleSheet.create({
  inputText: {
    backgroundColor: appTheme.COLORS.white,
    color: appTheme.COLORS.black,
    width: appTheme.ALIGNMENT.wp('80%'),
    height: appTheme.ALIGNMENT.hp(5.5),
    borderRadius: 16,
    margin: 12,
    padding: 10,

  }
})
