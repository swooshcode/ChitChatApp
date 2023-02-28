import React, { useState, useEffect } from 'react';
import Modal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  View,
  Text,
  Alert,
  Image,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import {
  GiftedChat,
  Bubble,
  Send,
  Message,
  RenderMessageTextProps,
  InputToolbar,
} from 'react-native-gifted-chat';
import Images from '../../Utils/Images';
import appTheme from '@constants/theme';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';
import { format } from 'date-fns';
import { Header } from '@components/Header/Header';

import sendButton from '../../assets/Images/SendButton.png';

const Chat = ({ navigation, route }) => {
  const { chatUser, thread, newGroup } = route.params;

  const [threadId, setThreadId] = useState(thread);
  const user = auth().currentUser;

  const [messages, setMessages] = useState([]);
  const [chatbox, setChatbox] = useState('');
  const [groupName, setGroupName] = useState(route.params.groupName);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (threadId) {
      firestore()
        .collection('THREADS')
        .doc(threadId)
        .set(
          {
            lastseen: new Date().getTime(),
          },
          { merge: true },
        );
    }
  }, [threadId]);

  const handleSend = async (messages = []) => {
    const text = messages[0].text;

    if (chatbox === '') {
      const mapped = [selectedUsers.map((item) => item.label)];

      if (selectedUsers.length >= 2) {
        mapped.push(user.displayName);
      }

      const strName = mapped.join(', ');

      const docRef = await firestore()
        .collection('THREADS')
        .add({
          lastseen: new Date().getTime(),
          isGroup: false,
          latestMessage: {
            text: text,
            created: new Date().getTime(),
            userid: user.uid.toString(),
            username: user.email,
          },
          groupName: strName,
          isGroup: selectedUsers.length <= 1 ? false : true,
          userid: [
            ...selectedUsers.map((item) => item.value.toString()),
            user.uid.toString(),
          ],
          users: [
            ...selectedUsers.map((item) => {
              return {
                id: item.value,
                name: item.label,
              };
            }),
            { id: user.uid.toString(), name: user.displayName },
          ],
        });

      setThreadId(docRef.id);
      setNewGroup(false);

      setChatbox(docRef.id);
    } else {
      firestore()
        .collection('THREADS')
        .doc(chatbox)
        .update({
          latestMessage: {
            text: text,
            created: new Date().getTime(),
            userid: user.uid.toString(),
            username: user.email,
          },
        });
    }

    await firestore()
      .collection('THREADS')
      .doc(chatbox)
      .collection('MESSAGES')
      .add({
        text: text,
        createdAt: new Date().getTime(),
        user: {
          _id: user.uid.toString(),
          name: user.displayName,
          avatar: user.photoURL,
        },
      });
    };
  
    const handleChange = (text) => {
      setChatbox(text);
    };
  
    const renderMessageText = (props) => {
      return (
        <View>
          <Text style={{ color: '#000' }}>{props.currentMessage.text}</Text>
        </View>
      );
    };
  
    const renderSend = (props) => {
      return (
        <Send {...props}>
          <View style={{ marginRight: 10, marginBottom: 5 }}>
            <Image source={sendButton} />
          </View>
        </Send>
      );
    };
  
    const renderInputToolbar = (props) => {};
  
    const renderBubble = (props) => {};
  
    return (
      <View style={{ flex: 1 }}>
        <Header title={groupName} />
  
        <GiftedChat messages={messages} onSend={handleSend} user={{ _id: user.uid }} />
  
        <InputToolbar containerStyle={{ backgroundColor: '#f5f5f5' }} />
  
        <RenderMessageTextProps textStyle={{ color: '#000' }} />
  
        <Bubble wrapperStyle={{ left: { backgroundColor: '#f5f5f5' } }} />
  
        <Send containerStyle={{ marginRight: 10, marginBottom: 5 }} />
  
        {Platform.OS === 'android' && Platform.Version >= 21 && ( // android version check for ripple effect on send button in gifted chat component.
          // Ripple effect is supported from android version 21 and above. So this code will only run if the android version is greater than or equal to 21. If the android version is lower than 21 then ripple effect will not be applied to the send button in gifted chat component.