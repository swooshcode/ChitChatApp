import {StyleSheet} from 'react-native';
import appTheme from '../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  dpImg: {
    marginTop:-30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dp: {
    width: appTheme.ALIGNMENT.wp(31),
    height: appTheme.ALIGNMENT.hp(15.5),
    borderRadius:100,
    position: 'absolute',
  },

  dpBG: {
    width: 310,
    height: 310,
    position: 'absolute',
    top: 24,
  },
  dpBG1: {
    width: 132,
    height: 132,
    position: 'absolute',
  },
  dpBG2: {
    width: 370,
    height: 370,
  },

  title: {
    marginTop: 30,
  },
  backArrow: {
    position: 'absolute',
    top: 32,
    left: 32,
    padding: 15,
    zIndex:1
  },
  icons: {
    width: appTheme.ALIGNMENT.wp(18),
    height: appTheme.ALIGNMENT.hp(9),
    borderRadius:100
  },
  linearGradient: {
    position: 'absolute',
    bottom: 0,
    width: appTheme.ALIGNMENT.wp('100%'),
    height: appTheme.ALIGNMENT.hp(48.5),
    borderTopRightRadius: 48,
    borderTopLeftRadius: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    alignItems: 'center',
  },
  endBtn: {
    alignItems: 'center',
    marginTop: 42,
  },
  line: {
    width: 32,
    height: 3,
    backgroundColor: '#F4D6D9',
    alignItems: 'center',
    marginTop: 24,
  },
  callerDetail: {
    alignItems: 'center',
    marginTop: 24,
  },
  callTime:{
    marginTop:12
  },
  iconCon: {
    flexDirection: 'row',
    marginTop: 42,
  },
  iconImg: {
    width: appTheme.ALIGNMENT.wp(16),
    height: appTheme.ALIGNMENT.hp(8),
    borderRadius:100,
    marginHorizontal: 25,
  },
});
