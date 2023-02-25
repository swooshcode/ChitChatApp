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

export const Chat = ({ navigation, route }) => {
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
    // Update the "lastseen" field in the thread document when the component mounts
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

  async function handleSend(messages = []) {
    // Get the text of the message to send
    const text = messages[0].text;

    if (chatbox == '') {
      // If there is no existing chatbox (i.e. this is a new chat), create a new thread
      const mapped = [selectedUsers.map((item) => item.label)];

      if (selectedUsers.length >= 2) {
        mapped.push(user.displayName);
      }

      const strName = mapped.join(', ');

      // Add the new thread to the "THREADS" collection in Firestore
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

      // Set the new thread ID and update the "newGroup" state
      setThreadId(docRef.id);
      setNewGroup(false);

      // Set the chatbox state to the new thread ID
      setChatbox(docRef.id);

      // Add the message to the new thread
      await docRef.collection('MESSAGES').add({
        message: text,
        created: new Date().getTime(),
        user
