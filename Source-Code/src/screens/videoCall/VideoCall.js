import React from 'react';
import {Image, ScrollView, View} from 'react-native';
import {styles} from './style';
import Images from '../../Utils/Images';

import TextComponent from '@components/textComponent/TextComponent';
import GradientComponent from '@components/Gradientcontainer/GradientContainer';
import ImageBtn from '@components/imageBtn/ImageBtn';
import Member from '@components/member/Member';

export default function VideoCall({navigation}) {
  const back = () => {
    navigation.goBack();
  };
  return (
    <GradientComponent>
      <View style={styles.container}>
        <View style={styles.headerCon}>
          <ImageBtn
            onPress={back}
            style={styles.backArrow}
            source={Images.backArrow}
          />
          <TextComponent style={styles.title} title label="Meeting" />
          <ImageBtn style={styles.menu} source={Images.menu} />
        </View>

        <TextComponent
          style={{textAlign: 'center', marginTop: 10}}
          time
          label="02:13"
        />

        <Image style={styles.video} source={Images.video} />

        <ImageBtn
          imgStyle={styles.videoMenuImg}
          style={styles.videoMenu}
          source={Images.videoMenu}
        />

        <View style={styles.iconsCon}>
          <ImageBtn
            imgStyle={styles.videoCallIcon}
            style={styles.callChat}
            source={Images.callChat}
          />
          <ImageBtn
            imgStyle={styles.videoCallIcon}
            style={styles.speaker}
            source={Images.speaker}
          />
          <ImageBtn
            imgStyle={styles.videoCallIcon}
            style={styles.voice}
            source={Images.voice}
          />
          <ImageBtn
            imgStyle={styles.videoCallIcon}
            style={styles.endCall}
            source={Images.endCall}
          />
        </View>
      </View>

      <ScrollView
        horizontal={true}
        style={styles.memberCon}
        showsHorizontalScrollIndicator={false}>
        <Member style={styles.member} mute dpSource={Images.img5} />
        <Member style={styles.member} unmute dpSource={Images.img2} />
        <Member style={styles.member} mute dpSource={Images.img3} />
        <Member style={styles.member} unmute dpSource={Images.img4} />
        <Member style={styles.member} mute dpSource={Images.img1} />
      </ScrollView>
    </GradientComponent>
  );
}
