


import React from "react";
import { ImageBackground,View,Text, Image } from "react-native";
import Images  from '../../Utils/Images';
import ImageBtn from '../imageBtn/ImageBtn';
import TextComponent from '../textComponent/TextComponent';
import appTheme from "@constants/theme";
export const Header = props => {
    console.log('🚀 ~ file: Chat.js ~ line 29 ~ Header ~ props', props);
    return (
      <View style={{...props.iHeight, zIndex: 1}}>
        <ImageBackground
          source={Images.headerBG}
          style={{
            width: appTheme.ALIGNMENT.wp('100%'),
            height: appTheme.ALIGNMENT.hp(9),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <ImageBtn
            onPress={props.onPress}
            style={{marginLeft: 10, padding: 10, zIndex: 5}}
            source={Images.backArrow}
          />
          <View style={{alignItems: 'center', width: 300, marginHorizontal: 5}}>
            <TextComponent title label={props.title} />
          </View>
          <Image
            style={{
              width: appTheme.ALIGNMENT.wp(8),
              height: appTheme.ALIGNMENT.hp(4),
              borderRadius: 100,
              marginRight: 30,
            }}
            source={Images.chatLogo}
          />
        </ImageBackground>
      </View>
    );
  };