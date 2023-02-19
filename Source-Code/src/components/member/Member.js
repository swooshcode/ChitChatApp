import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import appTheme from '../../constants/theme';
import Images from '../../Utils/Images';

export default function Member(props) {
  const {mute} = props;
  return (
    <View style={[styles.container,props.style]}>
      <Image style={styles.img} resizeMode="center" source={props.dpSource} />
      <View style={styles.micBG}>
        {mute === true ? <Image source={Images.mutee} /> : <Image source={Images.unmute} />}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container:{
    width:appTheme.ALIGNMENT.wp(15.25),
    height:appTheme.ALIGNMENT.hp(7.25),
  },
  micBG: {
    width: appTheme.ALIGNMENT.wp(6.15),
    height: appTheme.ALIGNMENT.hp(3),
    position: 'absolute',
    top: 33,
    right: 7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#22222D',
    borderWidth: 2,
    borderColor: '#CAC6D2',
    borderRadius: 100,
  },
  img:{
    width:55,
    height:55,
    width: appTheme.ALIGNMENT.wp(14),
    height: appTheme.ALIGNMENT.hp(7),
    borderRadius:100
  }
});
