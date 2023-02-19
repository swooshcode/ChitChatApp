import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import appTheme from '../../constants/theme'

export default function ToggleButton(props) {
  const [bgWhite, setBgWhite] = useState(true);
  const gradientClr = ['#108DA6', '#47A4ED'];
  const whiteClr = ['white', 'white'];
  const toggle = () => {
    if (bgWhite === true) {
      setBgWhite(false);
    } else {
      setBgWhite(true);
    }
  };
  return (
    <View style={[styles.container,props.style]}>
      <TouchableOpacity onPress={() => toggle()}>
        <LinearGradient
          style={styles.btn}
          start={{x: 0, y: 0}}
          colors={bgWhite === true ? gradientClr : whiteClr}>
          <Text
            style={[
              styles.btnText,
              bgWhite === true ? {color: 'white'} : {color: '#A1A1A1'},
            ]}>
            Email
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => toggle()}>
        <LinearGradient
          style={styles.btn}
          start={{x: 0, y: 0}}
          colors={bgWhite === true ? whiteClr : gradientClr}
          >
          <Text
            style={[
              styles.btnText,
              bgWhite === false ? {color: 'white'} : {color: '#A1A1A1'},
            ]}>
            Phone
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: appTheme.ALIGNMENT.wp(40),
    height:appTheme.ALIGNMENT.hp(5),
    backgroundColor: 'white',
    borderRadius: 77,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width:appTheme.ALIGNMENT.wp(18.25),
    height:appTheme.ALIGNMENT.hp(4),
    borderWidth:0,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: -0.02,
    color: 'white',
  },
});
