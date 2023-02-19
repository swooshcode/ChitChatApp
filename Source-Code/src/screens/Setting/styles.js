import {StyleSheet} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {ALIGNMENT} from '../../constants/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  topBox: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileImg: {
    height: 170,
    width: 170,
    marginTop: 100,
    marginBottom: 50,
    borderWidth: 4,
    borderColor: '#2796C3',
    borderRadius: 100
  },
  contentContainer: {
    alignItems: 'center',
    // backgroundColor: 'red',
    width: 90,
    alignSelf: 'center',
    borderRadius: 10,
    // height: 300,
  },
  middleBox: {
    width: 70,
    alignItems: 'center',
    alignSelf: 'center',
    position: 'relative',
    bottom: 60,
    borderRadius: 30,
    // backgroundColor: 'red',
  },
  editIcon: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    bottom: 147,
    left: 130,
  },
});
