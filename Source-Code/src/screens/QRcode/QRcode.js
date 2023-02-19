import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import GradientContainer from '../../components/Gradientcontainer/GradientContainer';
import TextComponent from '../../components/textComponent/TextComponent';
import Images from '../../Utils/Images';
import styles from './styles';
import ButtonComponent from '../../components/buttonComponent/ButtonComponent';
import appTheme from '../../constants/theme';

const QRcode = ({navigation}) => {
  return (
    <GradientContainer>
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <TouchableOpacity
          style={{
            // borderWidth: 3,
            position: 'relative',
            right: 100,
          }}
          onPress={() => navigation.goBack()}>
          <Image style={styles.backArrow} source={Images.backArrow} />
        </TouchableOpacity>
        <TextComponent
          heading
          label="QR Code"
          style={{
            color: 'black',
            fontSize: 24,
            marginTop: 24,
            fontWeight: 'bold',
          }}
        />
        <View></View>
      </View>
      <View style={styles.middleContainer}>
        <TextComponent
          colored
          label="mh designer"
          style={{
            fontSize: 28,
            marginTop: 20,
            fontWeight: 'bold',
            alignSelf: 'center',
          }}
        />
        <TouchableOpacity>
          <TextComponent
            normal
            label="duxica.com/messenger/mh-designer"
            style={{
              fontSize: 12,
              marginTop: 10,
              alignSelf: 'center',
              color: 'grey',
            }}
          />
        </TouchableOpacity>
        <Image style={styles.QRcodeImg} source={Images.bigQR} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginHorizontal: 30,
            marginTop: 25,
          }}>
          <Image style={styles.QRstyleing} source={Images.QRblue} />
          <Image style={styles.QRstyleing} source={Images.redQRimg} />
          <Image style={styles.QRstyleing} source={Images.blueQRimg} />
          <Image style={styles.QRstyleing} source={Images.purpleQRimg} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 16,
          }}>
          <Image style={styles.smallIcon} source={Images.firstSmallIcon} />
          <Image style={styles.smallIcon} source={Images.secondSmallIcon} />
          <Image style={styles.smallIcon} source={Images.thirdSmallIcon} />
          <Image style={styles.smallIcon} source={Images.forthSmallIcon} />
        </View>
        <ButtonComponent
          style={{alignSelf: 'center', width: appTheme.ALIGNMENT.wp('65%')}}
          label="Share My QR Code"
        />
      </View>
    </GradientContainer>
  );
};
export default QRcode;
