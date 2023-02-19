import {StyleSheet} from 'react-native';
import appTheme from '../../constants/theme';

export default StyleSheet.create({
  middleContainer: {
    backgroundColor: '#fcdef6',
    margin: 30,
    borderRadius: 25,
    height: appTheme.ALIGNMENT.hp(70),
    width: appTheme.ALIGNMENT.wp(79),
    alignSelf: 'center',
  },
  QRcodeImg: {
    alignSelf: 'center',
    marginTop: 20,

    width: appTheme.ALIGNMENT.wp(63),
    height: appTheme.ALIGNMENT.hp(30),
    borderRadius: 20,
  },
  backArrow: {
    height: 12,
    width: 10,
    marginTop: 38,
    // position: 'relative',
    // right: 100,
  },
  smallIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  QRstyleing: {
    height: 55,
    width: 55,
    resizeMode: 'contain',
  },
});
