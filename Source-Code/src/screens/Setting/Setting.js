import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import styles from './styles';
import Images from '../../Utils/Images';
import CustomList from '../../components/CustomList/CustomList';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Setting = ({ route, navigation }) => {
  // const { navigate } = navigation;
  const currentUser = auth()._user;
  console.log(currentUser, 'currentAut')
  const [userData, setUserData] = useState(null)
  const [profile, setProfile] = useState(currentUser.photoURL)

  useEffect( () => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Do whatever you want
      setProfile(currentUser.photoURL)
      if(currentUser){
        firestore()
            .collection('Users')
            .doc(currentUser.uid)
            .get()
            .then((snapchot) => {
              if(snapchot.exists){
                // console.log(snapchot.data(), 'newewewe')
                setUserData(snapchot.data())
                // console.log(userData, 'dataaaa')
              }
            });
      }
    });

    return unsubscribe
  }, [navigation])

  return (
    <View style={styles.container}>
      <View style={styles.topBox}>
        <Image style={styles.profileImg} source={{uri: profile}} />
      </View>
      <View style={styles.middleBox}>
        <CustomList
          customContainerStyles={{
            backgroundColor: 'white',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
          }}
          title={currentUser?.displayName}
          // belowText={'Name'}
          subTitle={'Name'}
          isLeftIcon={true}
          iconName={Images.User}
          // onButtonPress={() => navigation.navigate('Signup', true)}
          isRightIcon={false}
          icon={'chevron-right'}
        />
        <CustomList
          customContainerStyles={{
            backgroundColor: 'white',
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
          }}
          title={userData?.userName}
          subTitle={'UserName'}
          isLeftIcon={true}
          iconName={Images.atrate}
          // onButtonPress={() => navigation.navigate('Signup', true)}
          isRightIcon={false}
          icon={'chevron-right'}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Signup', true)}
        style={styles.editIcon}>
        <Image style={{ height: 42, width: 42 }} source={Images.edit} />
      </TouchableOpacity>
      <ScrollView
        style={{
          position: 'relative',
          bottom: 100,
          // backgroundColor: 'red',
        }}>
        <View style={styles.contentContainer}>
          <CustomList
            customContainerStyles={{ backgroundColor: '#E5E5E5' }}
            title={'New Story'}
            isLeftIcon={true}
            iconName={Images.circle}
            onButtonPress={() => navigation.navigate('Status')}
            isRightIcon={true}
            icon={'chevron-right'}
          />
          <CustomList
            customContainerStyles={{ backgroundColor: '#E5E5E5' }}
            title={'New Channel'}
            isLeftIcon={true}
            iconName={Images.VolumeBlue}
            onButtonPress={() => navigation.navigate('Hello')}
            isRightIcon={true}
            icon={'chevron-right'}
          />
          <CustomList
            customContainerStyles={{ backgroundColor: '#E5E5E5' }}
            title={'New Group'}
            isLeftIcon={true}
            iconName={Images.Profile}
            onButtonPress={() => navigation.navigate('Hello')}
            isRightIcon={true}
            icon={'chevron-right'}
          />
          <CustomList
            customContainerStyles={{ backgroundColor: '#E5E5E5' }}
            title={'Storage'}
            isLeftIcon={true}
            iconName={Images.Folder}
            onButtonPress={() => navigation.navigate('Hello')}
            isRightText={true}
            isRightIcon={true}
            icon={'chevron-right'}
          />
          <CustomList
            customContainerStyles={{
              backgroundColor: '#E5E5E5',
            }}
            title={'Settings'}
            isLeftIcon={true}
            iconName={Images.Setting}
            onButtonPress={() => navigation.navigate('Hello')}
            isRightIcon={true}
            isNotifcationIcon={true}
            icon={'chevron-right'}
          />
          <CustomList
            customContainerStyles={{ backgroundColor: '#E5E5E5' }}
            title={'Sign Out'}
            isLeftIcon={true}
            iconName={Images.Folder}
            onButtonPress={() => {
              auth().signOut().then(() => {
                navigation.navigate('Login', true)
              })
            }}
            // isRightText={true}
            isRightIcon={true}
            icon={'chevron-right'}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default Setting;
