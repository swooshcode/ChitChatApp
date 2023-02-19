import {StyleSheet} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import appTheme, {ALIGNMENT} from '../../constants/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  progressBarView: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: 20,
  },
  smallIcon: {
    height: 26,
    width: 26,
    resizeMode: 'contain',
  },
  lastContainer: {
    width: '100%',
    height: 117,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 48,
    borderTopLeftRadius: 48,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  smallText: {
    fontFamily: 'Poppins-Bold',
    // fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 10,

    color: '#FFFFFF',
    marginTop: 27,
    marginLeft: 5,
  },
  largeText: {
    fontFamily: 'Poppins-Bold',
    // fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    color: '#FFFFFF',
    marginTop: 25,
    marginLeft: 8,
  },
  statusImage: {
    height: 40,
    width: 40,
    marginTop: 20,
    marginLeft: 20,
    borderColor: 'pink',
    borderWidth: 2,
    borderRadius: 20,
  },
});
