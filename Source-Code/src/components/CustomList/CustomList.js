import React, {useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import appTheme from '../../constants/theme';
import LinearGradient from 'react-native-linear-gradient';

const {width} = Dimensions.get('window');

const CustomList = ({
  belowText,
  isNotifcationIcon,
  title,
  subTitle,
  isLeftIcon,
  isRightIcon,
  icon,
  iconName,
  customStyles,
  customContainerStyles,
  customIconStyles,
  onButtonPress,
  isRightCheck,
  color,
  fontSize,
  isRightText,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.container,
        customContainerStyles,
        {justifyContent: 'space-between'},
      ]}
      onPress={onButtonPress}>
      <View style={{flexDirection: 'row'}}>
        {isLeftIcon && (
          <View style={styles.leftIconContainer}>
            <Image
              source={iconName}
              style={[
                {
                  width: width / 14,
                  height: width / 14,
                  resizeMode: 'contain',
                },
                customIconStyles,
              ]}
            />
          </View>
        )}
        <View style={{marginLeft: subTitle ? 10 : 2}}>
          <Text
            style={[
              {
                color: '#474747',
                fontWeight: '600',
                fontSize: fontSize ? fontSize : 17,
                paddingVertical: 5,
                fontFamily: 'poppins',
              },
              customStyles,
            ]}>
            {title}
          </Text>

          {subTitle && (
            <Text
              style={[
                {
                  color: 'grey',
                  fontSize: 14,
                  paddingBottom: 5,
                },
                customStyles,
              ]}>
              {subTitle}
            </Text>
          )}
        </View>
      </View>
      {isRightText && (
        <View style={[styles.rightTextContainer]}>
          <Text style={styles.storageText}>89.5GB</Text>
          <Text style={styles.storagelightText}>/150GB</Text>
        </View>
      )}
      {isNotifcationIcon && (
        <LinearGradient
          style={styles.msgNo}
          start={{x: 1, y: 0}}
          colors={['#47A4ED', '#108DA6']}>
          <Text style={styles.numb}>2</Text>
        </LinearGradient>
      )}
      {isRightIcon && (
        <View style={[styles.rightIconContainer, {marginLeft: 10}]}>
          <Icon name={icon} size={14} color={'#515166'} />
        </View>
      )}
      {isRightCheck && (
        <View style={[styles.rightIconContainer, {marginLeft: 20}]}>
          <MaterialIcons
            name={'check-circle-outline'}
            size={30}
            color={color ? color : 'grey'}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: width - 40,
    height: width / 6,
    borderRadius: 4,
    paddingVertical: width / 25,
    alignItems: 'center',
    borderBottomWidth: 1.2,
    borderBottomColor: '#E5E5E5',
  },
  leftIconContainer: {
    width: width / 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightIconContainer: {width: width / 6, alignItems: 'center'},
  rightTextContainer: {
    width: width / 6,
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 30,
  },
  storageText: {
    color: '#474747',
    fontFamily: 'poppins',
    fontSize: 14,
    fontWeight: '500',
  },
  storagelightText: {
    color: '#A1A1A1',
    fontFamily: 'poppins',
    fontSize: 14,
  },
  numb: {
    alignSelf: 'center',
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    // lineHeight: 21,
    // letterSpacing: -0.02,
    color: 'white',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  msgNo: {
    width: appTheme.ALIGNMENT.wp(5.5),
    height: appTheme.ALIGNMENT.hp(2.75),
    position: 'absolute',
    left: 250,
    // top: 16,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomList;
