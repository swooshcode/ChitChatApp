import {StyleSheet} from 'react-native';
import appTheme from '../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  headerCon: {
    flexDirection: 'row',
    alignItems:'center',
    marginTop:30
  },
  title: {
    marginLeft:90,
    marginRight:101
  },
  backArrow: {
    marginLeft: 5,
    marginTop: 0, // Updated marginTop to 0
    padding: 15,
  },
  menu: {
    marginTop: 2,
  },
  video: {
    marginTop: 10,
    height: appTheme.ALIGNMENT.hp(71),
    width: appTheme.ALIGNMENT.wp(89),
    borderRadius: 32,
  },
  videoMenu: {
    position: 'absolute',
    top: 130,
    right: 15,
    marginRight: 5, // Added marginRight to position the element correctly
  },
  videoMenuImg: {
    height: appTheme.ALIGNMENT.hp(3.5),
    width: appTheme.ALIGNMENT.wp(7),
  },
  videoCallIcon: {
    height: appTheme.ALIGNMENT.hp(6.25),
    width: appTheme.ALIGNMENT.wp(12.5),
    borderRadius:100
  },
  iconsCon:{
    flexDirection:'row',
    position:'absolute',
    bottom:32,
    justifyContent: 'space-between',
    width:appTheme.ALIGNMENT.wp('75%') 
    
  },
  callChat: {
    position: 'absolute',
    bottom: 32,
    left: 44,
    marginLeft: 5, // Added marginLeft to position the element correctly
  },
  speaker: {
    position: 'absolute',
    bottom: 32,
    left: 115,
    marginLeft: 5, // Added marginLeft to position the element correctly
  },
  voice: {
    position: 'absolute',
    bottom: 32,
    left: 188,
    marginLeft: 5, // Added marginLeft to position the element correctly
  },
  endCall: {
    position: 'absolute',
    bottom: 32,
    right: 43,
    marginRight: 5, // Added marginRight to position the element correctly
  },
  memberCon: {
    marginTop: 25,
  },
  member: {
    marginLeft: 18,
  },
});