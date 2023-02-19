import React from 'react';
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
import {format} from 'date-fns';

import {styles} from './style';
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
import {COLORS} from '../../constants/theme';
import firestore from '@react-native-firebase/firestore';
import { useContext } from 'react';
import { CounterContext } from '../../context/ContextApi';


const Message = ({navigation}) => {


  async function onDisplayNotification(message) {
    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: `${message.title}`,
      body: `${message.body}`,
      android: {
        channelId,
        smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  const {counter,setCounter} = useContext(CounterContext);
  console.log('counter=-=-=-context=--=-=->',counter)
  let n = null;
  const [threads, setThreads] = React.useState([]);
  // console.log('🚀 ~ file: Message.js ~ line 45 ~ Message ~ threads', threads);
  const LoggedInUser = auth().currentUser;
  // console.log('🚀 ~ file: Chat.js ~ line 8 ~ Chat ~ user', LoggedInUser);
  const [allUsers, setAllUsers] = React.useState([]);
  const [filteredUsers, setFilteredUsers] = React.useState([]);
  const [groupChats, setGroupChats] = React.useState([]);
  // console.log('🚀 ~ file: Message.js:38 ~ Message ~ groupChats', groupChats);
  function renderGroupChat() {
    return (
      <>
        <View style={styles.groupCon}>
          <Image source={Images.hashTag} />
          <TextComponent
            style={styles.groupText}
            LabelText
            label="Groups & Channels"
          />
        </View>
        {groupChats.map(item => {
          console.log(item.unseen, "item unseen")
          const chatUser = {
            name:
              item.users[0].id == LoggedInUser.uid
                ? item.users[1]?.name
                : item.users[0]?.name,
            id:
              item.users[0]?.id == LoggedInUser?.uid
                ? item.users[1]?.id
                : item.users[0]?.id,
          };
          let isSeen;
          if (
            (item?.latestMessage?.created > item?.lastseen) | 0 &&
            item.latestMessage?.userid !== LoggedInUser?.uid
          ) {
            // console.log('Not seen');
            isSeen = false;
          } else {
            isSeen = true;
          }
          return (
            <GroupChat
              key={item._id}
              style={styles.groupChat}
              name={item?.groupName}
              img1={Images.grpimg1}
              img2={Images.grpimg2}
              img3={Images.grpimg3}
              msgQuantity={'2'}
              members={item?.userid?.length}
              onPress={() => {
                navigation.navigate('Chat', {
                  thread: item._id,
                  chatUser,
                  headerName: !item.groupName ? chatUser.name : item.groupName,
                  newGroup: false,
                  // headerName: item.userid?.length > 2 ? item.groupName : chatUser.name
                });
              }}
              seen={isSeen}
            />
          );
        })}
        <TextComponent style={styles.msgTitle} LabelText label="All Messages" />
      </>
    );
  }

  React.useEffect(() => {
    const unsubscribe = firestore()
      .collection('Users')
      .onSnapshot(querySnapshot => {
        const allUsers = querySnapshot.docs.map(documentSnapshot => {
          return {
            ...documentSnapshot.data(),
          };
        });
        setAllUsers(allUsers);
        // console.log(allUsers, 'all userss');
      });
    return () => unsubscribe();
  }, []);
  const seenFunction = (docId, value) => {
    firestore().collection('THREADS').doc(docId).set({
      seen: value,
    });
  };
  React.useEffect(() => {
    const unsubscribe = firestore()
      .collection('THREADS')
      .where('userid', 'array-contains-any', [LoggedInUser.uid.toString()])
      //  .orderBy('latestMessage.created', 'desc').limit(13)
      .onSnapshot(querySnapshot => {
        let groups = [];
        let chats = [];
        querySnapshot.docs.map(documentSnapshot => {
          const data = documentSnapshot.data();
          // console.log('adsd     sd sd     sdsd      sd sd      ', documentSnapshot.data())
          if (data.isGroup) {
            console.log('group:      ', data)
            groups.push({
              _id: documentSnapshot.id,
              name: '',
              latestMessage: {
                text: '',
              },
              ...documentSnapshot.data(),
            });
          } else {
            onDisplayNotification(data.latestMessage)
            chats.push({
              _id: documentSnapshot.id,
              name: '',
              latestMessage: {
                text: '',
              },
              ...documentSnapshot.data(),
            });
          }
          // console.log(chats)
        })
        setThreads(chats);
        setGroupChats(groups);
      });

    return () => unsubscribe();
  }, [LoggedInUser]);
  const handleSearchUser = text => {
    // console.log(
    //   '🚀 ~ file: Message.js ~ line 78 ~ handleSearchUser ~ text',
    //   text.length,
    // );
    if (text.length === 0) return setFilteredUsers([]);
    const clone = [...allUsers];
    const filter = clone.filter(item => {
      if (item.name.toLowerCase().startsWith(text.toLowerCase())) {
        return item;
      }
    });
    setFilteredUsers(filter);
    ``;
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleCon}>
        <TextComponent style={styles.title} title label="Messages" />
        <TextComponent style={styles.title2} colored label="48 New" />
        <ImageBtn
          style={{marginLeft: 120, marginTop: -8}}
          imgStyle={styles.addBtn}
          source={Images.addBtn}
          onPress={() =>
            navigation.navigate('Chat', {newGroup: true, chatUser: allUsers})
          }
        />
      </View>
      <Button title="Display Notification" onPress={() => onDisplayNotification()} />
      <View>
        <View
          style={{
            alignItems: 'center',
            marginTop: 13,
          }}>
          <InputComponent
            placeholder="Search anything..."
            onChangeText={handleSearchUser}
          />
          <Image
            source={Images.searchLogo}
            style={{
              position: 'absolute',
              top: 24,
              right: 60,
            }}
          />
        </View>

        <View
          style={{
            backgroundColor: COLORS.white,
            width: '80%',
            alignSelf: 'center',
            marginTop: -12,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}>
          <FlatList
            data={filteredUsers}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={{
                    marginVertical: 10,
                    marginHorizontal: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                  onPress={() => {
                    navigation.navigate('Chat', {
                      chatUser: item,
                      headerName: !item.groupName ? item.name : item.groupName,
                    });
                  }}>
                  <Text
                    style={{
                      color: COLORS.black,
                      fontWeight: '600',
                      fontSize: 16,
                    }}>
                    {item?.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
      <View style={styles.pinCon}>
        <Image source={Images.pinLogo} style={styles.pinLogo} />
        <TextComponent style={styles.pinText} label="Pin Chats" LabelText />
      </View>

      <View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={styles.iconCon}>
          <ImageIcon src={Images.img1} style={styles.imageIcon} />
          <ImageIcon src={Images.img2} style={styles.imageIcon} />
          <ImageIcon src={Images.img3} style={styles.imageIcon} />
          <ImageIcon src={Images.img4} style={styles.imageIcon} />
          <ImageIcon src={Images.img5} style={styles.imageIcon} />
        </ScrollView>
      </View>

      {}
      {/* <View style={{marginBottom:70,borderWidth:3}}> */}
      <FlatList
        style={{marginBottom: 65}}
        ListHeaderComponent={renderGroupChat}
        data={threads}
        renderItem={({item, id}) => {
          // console.log('🚀 ~ file: Message.js:301 ~ Message ~ item', item);
          const chatUser = {
            name:
              item.users[0].id == LoggedInUser.uid
                ? item.users[1]?.name
                : item.users[0]?.name,
            id:
              item.users[0]?.id == LoggedInUser?.uid
                ? item.users[1]?.id
                : item.users[0]?.id,
          };
          let isSeen;

          // console.log(item.latestMessage.userid, 'console item latest message');
          if (
            (item?.latestMessage?.created > item?.lastseen) | 0 &&
            item.latestMessage?.userid !== LoggedInUser?.uid
          ) {
            // console.log('Not seen');
            isSeen = false;
          } else {
            isSeen = true;
          }
          return (
            <View style={{alignItems: 'center'}}>
              <MessageComponent
                label={
                  // item.userid?.length > 2 ?
                  item.groupName
                    ? item.groupName
                    : item.users[0].id == LoggedInUser.uid
                    ? item.users[1].name
                    : item.users[0].name
                }
                dpImg={Images.dp1}
                latestMessage={item?.latestMessage?.text}
                // status={'online'}
                // type={'voicenote'}
                // statsIcon={'seen'}
                seen={isSeen }
                onPress={
                  () => {
                    navigation.navigate('Chat', {
                      thread: item._id,
                      chatUser,
                      headerName: !item.groupName
                        ? chatUser.name
                        : item.groupName,
                      newGroup: false,
                    });
                  }
                }
                message={true}
                time={format(item?.latestMessage?.created, 'KK:mm')}
              />
            </View>
          );
        }}
      />
      {/* </View> */}
    </View>
  );
};

export default Message;
