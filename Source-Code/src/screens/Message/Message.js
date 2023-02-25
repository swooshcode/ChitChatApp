import React, { useState, useEffect, useContext, useMemo } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';
import { format } from 'date-fns';

import { styles } from './style';
import Images from '../../Utils/Images';

import TextComponent from '@components/textComponent/TextComponent';
import InputComponent from '@components/InputComponent/InputComponent';
import ImageIcon from '@components/ImageIcon/ImageIcon';
import GroupChat from '@components/groupChat/GroupChat';
import ImageBtn from '@components/imageBtn/ImageBtn';
import MessageComponent from '@components/messageComponent/MessageComponent';
import notifee, { EventType } from '@notifee/react-native';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { COLORS } from '../../constants/theme';
import firestore from '@react-native-firebase/firestore';
import { CounterContext } from '../../context/ContextApi';

const NOTIFICATION_CHANNEL_ID = 'default';

const Message = ({ navigation }) => {
  const { counter, setCounter } = useContext(CounterContext);
  console.log('counter=-=-=-context=--=-=->', counter);

  const [threads, setThreads] = useState([]);
  const LoggedInUser = auth().currentUser;
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [groupChats, setGroupChats] = useState([]);

  const onDisplayNotification = async (message) => {
    await notifee.requestPermission();
    const channelId = await notifee.createChannel({
      id: NOTIFICATION_CHANNEL_ID,
      name: 'Default Channel',
    });
    await notifee.displayNotification({
      title: `${message.title}`,
      body: `${message.body}`,
     
