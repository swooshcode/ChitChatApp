import React from 'react';
import {Image, View} from 'react-native';
import {styles} from './style';

import Images from '../../Utils/Images';

import ImageBtn from '@components/imageBtn/ImageBtn';
import TextComponent from '@components/textComponent/TextComponent';

import GradientContainer from '@components/Gradientcontainer/GradientContainer';

export default function PhoneCall({navigation}) {
  const back = () => {
    navigation.goBack();
  };
  return (
    <GradientContainer>
      <ImageBtn
        onPress={back}
        style={styles.backArrow}
        source={Images.backArrow}
      />
      <TextComponent style={styles.title} title label="Messenger Call" />

      <View style={styles.dpImg}>
        <Image style={styles.dpBG2} source={Images.dpBG2} />
        <Image style={styles.dpBG} source={Images.dpBG} />
        <Image style={styles.dpBG1} source={Images.dpBG1} />
        <Image style={styles.dp} source={Images.callerDp} />
      </View>

      <View style={styles.linearGradient}>
        <View style={styles.line}></View>
        <View style={styles.callerDetail}>
          <TextComponent style={styles.callerName} title label="Mahdi Fadaee" />
          <TextComponent style={styles.callTime} time label="00:13" />
        </View>

        <View style={styles.iconCon}>
          <ImageBtn imgStyle={styles.iconImg} source={Images.speakerIcon} />
          <ImageBtn imgStyle={styles.iconImg} source={Images.micIcon} />
          <ImageBtn imgStyle={styles.iconImg} source={Images.videoIcon} />
        </View>

        <ImageBtn
          imgStyle={styles.icons}
          style={styles.endBtn}
          source={Images.endBtn}
        />
      </View>
    </GradientContainer>
  );
}
