import React from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import appTheme from '@constants/theme';
export default function GradientContainer({children}) {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}

      colors={[appTheme.COLORS.lightPink,appTheme.COLORS.orange]}
      style={styles.linearGradient}>
      {children}
    </LinearGradient>
  );
}
var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
});
