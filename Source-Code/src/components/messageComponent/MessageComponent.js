import React from 'react';
import {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import appTheme from '../../constants/theme';
import Images from '../../Utils/Images';

export default function MessageComponent(props) {
  // const [numOfMsg, setNumOfMsg] = useState(null);
  const {status, type, statsIcon, label, onPress,msgNum, seen} = props;
  console.log(
    '🚀 ~ file: MessageComponent.js:9 ~ MessageComponent ~ seen',
    seen,
  );

  // if (!seen ) {
  //   setNumOfMsg(num + 1);
  // } else {
  //   setNumOfMsg(num);
  // }
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, props.style]}>
        <Image style={styles.dp} source={props.dpImg} />

        {status === 'online' ? (
          <Image style={styles.stats} source={Images.online} />
        ) : null}

        <Text style={[styles.name]}>{label}</Text>
        <Text style={[styles.typetext]}>{props.latestMessage}</Text>

        {/* {type === 'voicenote' ? (
          <>
            <Image style={styles.typeimg} source={Images.voicenote} />
            <Text style={styles.typetext}>Voice Message</Text>
          </>
        ) : type === 'files' ? (
          <>
            <Image style={styles.typeimg} source={Images.file} />
            <Text style={styles.typetext}>3 Files</Text>
          </>
        ) : type === 'call' ? (
          <>
            <Image style={styles.typeimg} source={Images.callIcon} />
            <Text style={styles.typetext}>14m : 45s</Text>
          </>
        ) : type === 'videoCall' ? (
          <>
            <View >
              <Image style={[styles.typeimg,{height: appTheme.ALIGNMENT.hp(1.5),top:46}]}  source={Images.videoCall} />
            </View>
            <Text style={styles.typetext}>14m : 45s</Text>
          </>
        ) : null} */}

        {statsIcon === 'seen' ? (
          <>
            <Image style={styles.tikStyle} source={Images.tik} />
            <Image style={styles.tik2Style} source={Images.tik} />
          </>
        ) : statsIcon === 'deliver' ? (
          <Image style={styles.tikStyle} source={Images.tik} />
        ) : statsIcon === 'recive' ? (
          <LinearGradient
            style={styles.msgNo}
            start={{x: 1, y: 0}}
            colors={['#ADADAD', '#ADADAD']}>
            <Text style={styles.numb}>2</Text>
          </LinearGradient>
        ) : statsIcon === 'dial' ? (
          <Image style={styles.tikStyle} source={Images.dailCall} />
        ) : statsIcon === 'missCall' ? (
          <Image style={styles.tikStyle} source={Images.missCall} />
        ) : null}
        {!seen ? (
          null
          // <View style={styles.seen}>
          //   <Text style={{color: '#FFF'}}>!</Text>
          // </View>
        ) : null}
        <Text style={styles.time}>{props.time}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: appTheme.ALIGNMENT.wp('90%'),
    height: appTheme.ALIGNMENT.hp(11),
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 0.7,
  },
  dp: {
    position: 'absolute',
    top: 17,
    left: 25,
    width: appTheme.ALIGNMENT.wp(12.5),
    height: appTheme.ALIGNMENT.hp(6.25),
    borderRadius: 100,
  },
  stats: {
    position: 'absolute',
    left: 63,
    top: 55,
  },
  name: {
    position: 'absolute',
    left: 90,
    top: 16,
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: -0.02,
    color: '#474747',
  },
  typeimg: {
    position: 'absolute',
    left: 90,
    top: 45,
    width: appTheme.ALIGNMENT.wp(3.5),
    height: appTheme.ALIGNMENT.hp(1.75),
  },
  typetext: {
    position: 'absolute',
    left: 90,
    top: 42,
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: -0.02,
    color: '#A1A1A1',
  },
  tikStyle: {
    position: 'absolute',
    left: 310,
    top: 20,
  },
  tik2Style: {
    position: 'absolute',
    left: 315,
    top: 20,
  },
  time: {
    position: 'absolute',
    left: 303,
    top: 45,
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: -0.02,
    color: '#A1A1A1',
  },
  seen: {
    position: 'absolute',
    left: 303,
    top: 18,
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: -0.02,
    color: '#ADADAD',
    backgroundColor: '#ADADAD',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  msgNo: {
    width: appTheme.ALIGNMENT.wp(5.5),
    height: appTheme.ALIGNMENT.hp(2.75),
    position: 'absolute',
    left: 310,
    top: 16,
    borderRadius: 16,
  },
  numb: {
    position: 'absolute',
    top: 2,
    left: 7,
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 21,
    letterSpacing: -0.02,
    color: 'white',
  },
});
