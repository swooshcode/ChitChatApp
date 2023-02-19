import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { styles } from './style';
import auth from '@react-native-firebase/auth';
///////////////////////  Components  ////////////////////////////////
import TextComponent from '../../components/textComponent/TextComponent';
import InputComponent from '@components/InputComponent/InputComponent';
import ButtonComponent from '../../components/buttonComponent/ButtonComponent';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';

export default function Signup({ navigation }) {
  const { navigate } = navigation;
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const handleSignIn = () => {
    if (name === '') {
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
          Alert.alert('Something went wrong Try Again');
        });
    }
  };

  return (
    <LinearGradient
      style={{ flex: 1 }}
      start={{ x: 1, y: 1 }}
      end={{ x: 1, y: 0 }}
      colors={[
        '#E5E5E5',
        '#E5E5E5',
        '#E5E5E5',
        '#E5E5E5',
        '#E5E5E5',
        '#FFC7B6',
        '#FFC7B6',
      ]}>
      <View style={styles.container}>
        <TextComponent heading label="Chit Chat" style={{ color: '#A1A1A1' }} />
        <TextComponent
          title
          label="Sign Up"
          style={{
            color: 'black',
            marginTop: 130,
            marginBottom: 20,
            fontSize: 24,
          }}
        />
        <InputComponent
          placeholder="Enter Name"
          onChangeText={text => {
            setName(text);
          }}
          value={name}
        />
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
        <ButtonComponent disabled={isLoading} label="Sign Up" onPress={handleSignIn} />
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <TextComponent normal label="Already have Account" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
