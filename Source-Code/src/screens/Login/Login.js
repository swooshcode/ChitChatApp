import React, { useEffect } from 'react';
import {Alert, TouchableOpacity, View, Image, Text} from 'react-native';
import Images from '../../Utils/Images';
import {styles} from './style';
import PhoneInput from "react-native-phone-number-input";
import ToggleButton from '@components/toggleButton/ToggleButton';
//////////////////  components  //////////////////////////////////
import TextComponent from '@components/textComponent/TextComponent';
import InputComponent from '@components/InputComponent/InputComponent';
import ButtonComponent from '@components/buttonComponent/ButtonComponent';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';

export default function Login({route, navigation}) {

  const startLogin = (type) => {
    if(type){
      setLoginType(type)
    }
    setToggleLogin(!toggleLogin)
  }
  const handleLogin = () => {
    if(toggleState){
      if (phone === '') {
        Alert.alert('Phone field is empty');
      } else {
        setIsLoading(true)
        auth()
          .signInWithPhoneNumber(phone)
          .then(res => {
            // console.log('User account created & signed in!', res);
            setIsLoading(false);
            navigation.navigate('Verify', res);
          })
          .catch(error => {
            if (error.code === 'auth/user-not-found') {
              Alert.alert("User Not Found");
              setIsLoading(false);
            }else{
              Alert.alert("Error logging in. Try again later.")
            }
            setIsLoading(false);
          });
  
      }
      
    }else{
      if (email === '') {
        Alert.alert('Email is empty');
      } else if (password === '') {
        Alert.alert('Password is empty');
      } else {
        setIsLoading(true)
        auth()
          .signInWithEmailAndPassword(email, password)
          .then(res => {
            // console.log('User account created & signed in!', res);
            setIsLoading(false);
            navigation.navigate('Bottom');
          })
          .catch(error => {
            if (error.code === 'auth/user-not-found') {
              Alert.alert("Email doesn't found");
              setIsLoading(false);
            }
  
            if (error.code === 'auth/invalid-email') {
              Alert.alert('That email address is invalid!');
              setIsLoading(false);
            }
            if (error.code === 'auth/wrong-password') {
              Alert.alert('That Password is invalid!');
              setIsLoading(false);
            }
            Alert.alert('Something went wrong Try Again');
            setIsLoading(false);
          });
  
      }  
    }
  };

  const handleSignIn = () => {
    if(loginType == 'Log In') handleLogin()
    else if (name === '') {
      Alert.alert('Name is empty');
    } else if (email === '') {
      Alert.alert('Email is empty');
    } else if (password === '') {
      Alert.alert('Password is empty');
    } else {
      setIsLoading(true);
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          if (res.user) {
            res.user.updateProfile({
              displayName: name
            })
          }
          const userInfo = {
            name: name,
            email: res.user.email,
            id: res.user.uid,
          };
          firestore()
            .collection('Users')
            .doc(userInfo.id)
            .set(userInfo)
            .then(() => {
              setIsLoading(false);
              Alert.alert('User created');
              navigate('Bottom');
            });
          console.log(
            '🚀 ~ file: Signup.js ~ line 24 ~ .then ~ userInfo',
            userInfo,
          );
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            setIsLoading(false);
            Alert.alert('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            setIsLoading(false);
            Alert.alert('That email address is invalid!');
          }
          if (error.code === 'auth/weak-password') {
            setIsLoading(false);
            Alert.alert('Password should be at least 6 characters');
          }
          setIsLoading(false);
          // Alert.alert('Something went wrong Try Again');
        });
    }
  };

  useEffect(() => {
    if(route.params){
      setName('')
      setEmail('')
      setValue('')
      setPhone('')
      startLogin()
    }
  }, [])
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [phone, setPhone] = React.useState('');
  const [isLoading , setIsLoading] = React.useState(false);
  const [toggleLogin, setToggleLogin] = React.useState(false)
  const [loginType, setLoginType] = React.useState('Log in')
  const [value, setValue] = React.useState("");
  const phoneInput = React.useRef(null);
  const [toggleState, setToggleState] = React.useState(true)
  const [profile, setProfile] = React.useState('')
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
          <TextComponent heading label="Welcome to ChitChat" style={{color: '#2796C3'}} />
          <Text style={styles.tagline}>Create an account or login to begin chatting</Text>
        </View>
        <View style={{...styles.options, display: `${toggleLogin ? 'none' : 'flex'}`}}>
          <ButtonComponent disabled={isLoading} label="Log In" onPress={() => startLogin('Log In')}  />
          <ButtonComponent disabled={isLoading} label="Sign Up" onPress={() => startLogin('Sign Up')} colors={['#F8CB6C', '#C96AF6']} />
        </View>
        <View style={{...styles.loginBox, display: `${toggleLogin ? 'flex' : 'none'}`}}>
          <TextComponent
            title
            label={`${loginType}`}
            style={{
              color: 'black',
              marginBottom: 20,
              fontSize: 24,
            }}
          />
          <ToggleButton style={styles.toggleBtn} titles={['Email', 'Phone']} toggle={(s) => {
            setToggleState(s)
            console.log(toggleState, 'state')
          }}/>
          {/* https://www.npmjs.com/package/react-native-phone-number-input */}
          <View style={{...styles.phoneLogin, display: `${toggleState ? 'flex' : 'none'}`}}>
            <PhoneInput
              ref={phoneInput}
              defaultValue={value}
              defaultCode="US"
              layout="first"
              onChangeText={(text) => {
                setValue(text);
              }}
              onChangeFormattedText={(text) => {
                setPhone(text);
              }}
              withShadow
            />
            <ButtonComponent disabled={isLoading} label={`${loginType}`} onPress={handleLogin}  />
          </View>
          <View style={{...styles.emailLogin, display: `${toggleState ? 'none' : 'flex'}` }}>
            {
              loginType == 'Log In' ? null : (<InputComponent
                placeholder="Enter Name"
                onChangeText={text => {
                  setName(text);
                }}
                value={name}
                />)
            }
            
            <InputComponent
              onChangeText={text => {
                setEmail(text);
              }}
              value={email}
              placeholder="Enter Email"
              keyboardType={'email-address'}
            />
            <InputComponent
              placeholder="Enter Password"
              onChangeText={text => {
                setPassword(text);
              }}
              value={password}
              secureTextEntry={true}
            />
            <ButtonComponent disabled={isLoading} label={`${loginType}`} onPress={handleSignIn} />
          </View>
          
          <TouchableOpacity onPress={() => startLogin()}>
            <TextComponent normal label="Go Back" />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}
