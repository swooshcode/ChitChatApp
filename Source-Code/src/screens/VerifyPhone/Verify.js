import React from 'react';
import {Alert, TouchableOpacity, View, Image, Text} from 'react-native';
import Images from '../../Utils/Images';
import {styles} from './style';

//////////////////  components  //////////////////////////////////
import TextComponent from '@components/textComponent/TextComponent';
import InputComponent from '@components/InputComponent/InputComponent';
import ButtonComponent from '@components/buttonComponent/ButtonComponent';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';

export default function Verify({route, navigation}) {

  async function confirmVerificationCode(code) {
    try {
      if(code == '') {
        Alert.alert('Please Enter a Valid Code')
        return
      }
      console.log(route.params, code, 'bleh')
      let res = await route.params.confirm(code);
      console.log(res)
    } catch (error) {
      alert('Invalid code');
    }
  }
  const [phone, setPhone] = React.useState('');
  const [code, setCode] = React.useState('')
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
        <View>
          <TextComponent heading label="" style={{color: '#2796C3', marginTop: 40}} />
          <TextComponent heading label="Verify Phone Your Phone Number to Continue" style={{color: '#2796C3', fontSize: 25}} />
          {/* <Text style={styles.tagline}>Create an account or login to begin chatting</Text> */}
        </View>
        <View style={styles.loginBox}>
          <TextComponent
            title
            label="Verification Code:"
            style={{
              color: 'black',
              marginBottom: 20,
              fontSize: 22,
            }}
          />
          <InputComponent
            placeholder="Enter Code"
            secureTextEntry={true}
            value={code}
            onChangeText={text => setCode(text)}
          />
          <ButtonComponent label="Verify" onPress={() => confirmVerificationCode(code)}  />
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <TextComponent normal label="Go Back" />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}
