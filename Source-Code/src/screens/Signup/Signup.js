import React, { useEffect } from 'react';
import {Alert, TouchableOpacity, View, Image, Text, Platform} from 'react-native';
import Images from '../../Utils/Images';
import {styles} from './style';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import * as ImagePicker from 'react-native-image-picker';
import {request, PERMISSIONS} from 'react-native-permissions';
import RNRestart from 'react-native-restart';
//////////////////  components  //////////////////////////////////
import TextComponent from '@components/textComponent/TextComponent';
import InputComponent from '@components/InputComponent/InputComponent';
import ButtonComponent from '@components/buttonComponent/ButtonComponent';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import PhoneInput from "react-native-phone-number-input";

export default function Signup({route, navigation}) {
  const user = auth()._user
  const userUpdater = auth()._nativeModule
  // console.log(userUpdater, 'auth - userUpdater')
  // console.log(route.params, 'params')
  async function submitData() {
  // console.log(userUpdater, 'auth - userUpdater')

    try {
      if(name == '' || userName == '' || placeholder == '') {
        Alert.alert('Please Fill in all displayed data')
        return
      }
      if (userUpdater) {
        // console.log('updatingProfile', userUpdater.reload)
        const pathToFile = Platform.OS == 'ios' ? placeholder.replace('file://', '') : placeholder
        storage()
          .ref('profiles/' + user.uid)
          .putFile(pathToFile)
          .then(() => {
            storage()
              .ref('profiles/' + user.uid)
              .getDownloadURL()
              .then((result) => {
                if (result != null) {
                  auth().currentUser.updateProfile({
                    displayName: name,
                    photoURL: result
                  })
                }
              })
              .catch((err) => {
                Alert.alert(err)
              })
          })
          .catch((err) => {
            Alert.alert(err)
          })

        updateEmailPhone()
      }
      // console.log('userUpdaterinfoing')
      const userInfo = {
        name: name,
        userName: userName,
        email: email,
        phoneNumber: phone,
        id: user.uid,
      };
      console.log('pushing to firestore')
      firestore()
        .collection('Users')
        .doc(userInfo.id)
        .set(userInfo)
        .then(() => {
          setIsLoading(false);
          // Alert.alert('User created');
          auth().currentUser.reload()
            .then(() => {
              if(route.params) RNRestart.Restart()
              navigation.navigate('Bottom');
            })
        });
    } catch (error) {
      // console.log('eororororr', error)
      alert(error);
    }
  }

  const updateEmailPhone = async () => {
    if(user.phoneNumber){ //update email since phone number exists
      // userUpdater.updateEmail(email)
    }else{ //update phone since email exists
      // userUpdater.updatePhoneNumber(phone)
    }
  }

  const requestCameraPermissions = async () => {
    if(Platform.OS == 'ios'){
      request(PERMISSIONS.IOS.LOCATION_ALWAYS).then((result) => {
        // …
        // console.log(result)
      });
    }else{
      request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES).then((result) => {
        // console.log(result)
      })
    }
  }

  const grabProfile = async () => {
    try {
      // console.log(ImagePicker)
      const result = await ImagePicker.launchImageLibrary({
        mediaType: 'photo',
        includeBase64: false,
        quality: 1
      })
      if(result){
        setPlaceholder(result.assets[0].uri)
        // console.log(placeholder)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const resetData = async () => {
    setPhone('')
    setName('')
    setUserName('')
    setEmail('')
  }

  useEffect( () => {
    requestCameraPermissions()
    if(user){
      firestore()
          .collection('Users')
          .doc(user.uid)
          .get()
          .then((snapchot) => {
            if(snapchot.exists){
              // console.log(snapchot.data())
              setDefaultData(snapchot.data())
            }
          });
    }
    if(user.photoURL){
      setPlaceholder(user.photoURL)
    }
  }, [])

  const [defaultData, setDefaultData] = React.useState(null)
  const [isLoading , setIsLoading] = React.useState(false);
  const [placeholder, setPlaceholder] = React.useState('')

  const [phone, setPhone] = React.useState('');
  const [name, setName] = React.useState('')
  const [userName, setUserName] = React.useState('')
  const [email, setEmail] = React.useState('')
  // const [value, setValue] = React.useState("");
  // const phoneInput = React.useRef(null);

  return (
    <LinearGradient
      style={{flex: 1}}
      start={{x: 1, y: 1}}
      end={{x: 1, y: 0}}
      colors={[
        '#F1F1F6',
        '#F1DDE9',
        '#F1DCE9',
        '#F7CDEB',
        '#F8D5D7',
        '#F8D7D2',
        '#F8DECF',
        '#F8DDCF',
      ]}>
      <View style={styles.container}>
        <Image source={Images.chatLogo} style={styles.appLogo}/>
        <View style={styles.loginBox}>
          <TextComponent
            title
            label="Account Setup"
            style={{
              color: 'black',
              marginBottom: 20,
              fontSize: 22,
            }}
          />
          <TouchableOpacity style={styles.profileContainer} onPress={grabProfile}>
            <Image source={placeholder ? {uri: placeholder} : Images.upload} style={styles.profilePic}/>
          </TouchableOpacity>
          <InputComponent
            placeholder={`Display Name: ${defaultData?.name || ''}`}
            value={name}
            onChangeText={text => setName(text)}
          />
          <InputComponent
            placeholder={`User Name: ${defaultData?.userName || ''}`}
            value={userName}
            onChangeText={text => setUserName(text)}
          />
          {user.phoneNumber ? (
            <InputComponent
            placeholder={`Email: ${defaultData?.email || ''}`}
            value={email}
            onChangeText={text => setEmail(text)}
          />
          ) : (
            // <PhoneInput
            //   ref={phoneInput}
            //   defaultValue={value}
            //   defaultCode="US"
            //   layout="first"
            //   onChangeText={(text) => {
            //     setValue(text);
            //   }}
            //   onChangeFormattedText={(text) => {
            //     setPhone(text);
            //   }}
            //   withShadow
            // />
            null
          )}
          
          <ButtonComponent disabled={isLoading} label="Save" onPress={() => submitData()}  />
          <TouchableOpacity onPress={resetData}>
            <TextComponent normal label="Reset" />
          </TouchableOpacity>
          {route.params ? (<TouchableOpacity onPress={() => navigation.goBack()} style={{marginTop: 5}}>
            <TextComponent normal label="Go Back" />
          </TouchableOpacity>) : null}
        </View>
      </View>
    </LinearGradient>
  );
}
