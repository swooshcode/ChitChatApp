import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { LinearTextGradient } from 'react-native-text-gradient';

import Images from '../../Utils/Images';

export default function GroupChat(props) {
  let array = props.name;
var nameArr = array.split(' ');
console.log(nameArr);

  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <View style={[styles.container, props.style]}>
        <Image style={styles.img1} source={props.img1} />
        <Image style={styles.img2} source={props.img2} />
        <Image style={styles.img3} source={props.img3} />
        <Text numberOfLines={1} style={styles.grpName}>{nameArr.join(' ')}</Text>
        <LinearTextGradient
          style={styles.grpMembers}
          locations={[0, 1]}
          colors={['#108DA6', '#47A4ED']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}>
          <Text>{props.members} Members</Text>
        </LinearTextGradient>
        {
          !props.seen ?
            <LinearGradient
              style={styles.msgNo}
              start={{ x: 1, y: 0 }}
              colors={['#108DA6', '#47A4ED']}>
              <Text style={styles.numb}>!!</Text>
            </LinearGradient>
            : null
        }
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
  },
  img1: {
    position: 'absolute',
    top: 10,
    left: 35,
    width: 32,
    height: 32,
    borderRadius: 100
  },
  img2: {
    position: 'absolute',
    left: 68,
    width: 24,
    height: 24,
    borderRadius: 100
  },
  img3: {
    position: 'absolute',
    top: 28,
    left: 67,
    width: 18,
    height: 18,
    borderRadius: 100
  },
  grpName: {
    position: 'absolute',
    left: 100,
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: -0.02,
    color: '#474747',
    width: 200
  },
  grpMembers: {
    position: 'absolute',
    left: 100,
    top: 21,
    fontFamily: 'Poppins-Regular',
    fontWeight: '300',
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: -0.02,
  },
  atRate: {
    position: 'absolute',
    left: 284,
    top: 15,
  },
  atRateof: {
    position: 'absolute',
    top: 6,
    right: 5,
  },
  msgNo: {
    width: 21,
    height: 21,
    position: 'absolute',
    left: 320,
    top: 5,
    borderRadius: 16,
  },
  numb: {
    position: 'absolute',
    top: 0,
    left: 7,
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 21,
    letterSpacing: -0.02,
    color: 'white',
  },
});
