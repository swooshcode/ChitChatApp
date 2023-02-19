import React, {useState, useEffect} from 'react';
import Modal from 'react-native-modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
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
import {format} from 'date-fns';
import { Header } from '@components/Header/Header';

const sendButton = require('../../assets/Images/SendButton.png');

export const Chat = ({navigation, route}) => {
  useEffect(() => {
    if(thread) {
    firestore().collection('THREADS').doc(thread).set(
      {
        lastseen: new Date().getTime(),
      },
      {merge: true},
    );
  }
  }, []);
  const [chatbox, setChatbox] = useState('');
  console.log(chatbox, "chat Box")
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const {chatUser, thread, newGroup} = route.params;
  const [threadId, setThreadId] = React.useState(thread);
  const user = auth().currentUser;
  const [messages, setMessages] = React.useState([]);
  const [groupName, setGroupName] = React.useState(route.params.headerName);
  const insets = useSafeAreaInsets()

  async function handleSend(messages) {
    const text = messages[0].text;
    if (chatbox == '') {
      const mapped = [selectedUsers.map(item => item.label)];
      console.log(mapped.length, "mapped")
      if(selectedUsers.length >= 2) {
        mapped.push(user.displayName)
      }
      const strName = mapped.join(', ');
      setGroupName(strName);
      firestore()
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
          userid: [...selectedUsers.map(item => item.value.toString()), user.uid.toString()],
          users: [
            ...selectedUsers.map(item => {
              return {
                id: item.value,
                name: item.label,
              };
            }),
            {id: user.uid.toString(), name: user.displayName},
          ],
        })
        .then(docRef => {
          setNewGroup(false);
          setChatbox(docRef.id);
          setThreadId(docRef.id);
          docRef
            .collection('MESSAGES')
            .add({
              message: text,
              created: new Date().getTime(),
              user: {
                id: user.uid.toString(),
                name: user.displayName,
              },
              delivered: true
            })      
          firestore()
            .collection('THREADS')
            .doc(docRef.id)
            .collection('MESSAGES')
            .orderBy('created', 'desc')
            .onSnapshot(querySnapshot => {
              const messages = querySnapshot.docs.map(doc => {
                const firebaseData = doc.data();
                const data = {
                  _id: doc.id,
                  text: firebaseData.message,
                  createdAt: firebaseData.created,
                  ...firebaseData,
                  user: {
                    _id: firebaseData.user.id,
                    name: firebaseData.user.name,
                  },
                };
                return data;
              });
                 setMessages(messages);
            });
        });
 
    } else {
      console.log(chatbox, "chat");
      firestore()
        .collection('THREADS')
        .doc(chatbox)
        .collection('MESSAGES')
        .add({
          message: text,
          created: new Date().getTime(),
          user: {
            id: user.uid.toString(),
            name: user.displayName,
          },
          delivered: true
        })
      await firestore()
        .collection('THREADS')
        .doc(chatbox)
        .set(
          {
            latestMessage: {
              text: text,
              userid: user.uid.toString(),
              username: user.displayName,
              created: new Date().getTime(),
            },
          },
          {merge: true},
        );
    }
  }
  const [value, setValue] = useState(null);
  console.log(chatUser);
  const [groupUser, setGroupUser] = useState(
    Array.isArray(chatUser)
      ? chatUser
          ?.map(item => {
            return {
              value: item.id,
              label: item.name,
            };
          })
          .filter(item => item.value !== user.uid)
      : null,
  );
  const [items, setItems] = useState(groupUser);
  const [isNewGroup, setNewGroup] = React.useState(newGroup);
  const [modelView, setModelView] = useState(false);
  const toggleModel = () => {
    if (modelView === false) {
      setModelView(true);
    } else {
      setModelView(false);
    }
  };
  useEffect(() => {
    if (isNewGroup) {
      console.log('New Group');
    } else {
      if (chatUser.id == user.uid) {
        Alert.alert('Same User ', 'My Alert Msg', [
          {text: 'OK', onPress: () => navigation.goBack()},
        ]);
      }
      if (threadId) {
        const messagesListener = firestore()
          .collection('THREADS')
          .doc(threadId)
          .collection('MESSAGES')
          .orderBy('created', 'desc')
          .onSnapshot(querySnapshot => {
            const messages = querySnapshot.docs.map(doc => {
              const firebaseData = doc.data();
              const data = {
                _id: doc.id,
                text: firebaseData.message,
                createdAt: firebaseData.created,
                ...firebaseData,
                user: {
                  _id: firebaseData.user.id,
                  name: firebaseData.user.name,
                  // avatar: Images.profile2,
                  // avatar: BaseSetting.domain + '/services/GetProfilePic?userId=' + firebaseData.user.id + '&id=' + Date.now()
                },
              };
              return data;
            });
            setMessages(messages);
            setChatbox(thread);
          });
      } else {
        const messagesListener = firestore()
          .collection('THREADS')
          .where('userid', 'in', [
            [user.uid.toString(), ...selectedUsers.map((item) => item.value)],
            [ ...selectedUsers.map((item) => item.value), user.uid?.toString()],
          ])
          // .where('isGroup', '==', false)
          //.orderBy('latestMessage.created', 'desc')
          .onSnapshot(querySnapshot => {
            const threads = querySnapshot.docs.map(documentSnapshot => {
              firestore()
                .collection('THREADS')
                .doc(documentSnapshot.id)
                .collection('MESSAGES')
                .orderBy('created', 'desc')
                .onSnapshot(querySnapshot => {
                  const messages = querySnapshot.docs.map(doc => {
                    const firebaseData = doc.data();
                    const data = {
                      _id: doc.id,
                      text: firebaseData.message,
                      createdAt: firebaseData.created,
                      ...firebaseData,
                      user: {
                        _id: firebaseData.user.id,
                        name: firebaseData.user.name,
                        // avatar: Images.profile2,
                        // avatar: BaseSetting.domain + '/services/GetProfilePic?userId=' + firebaseData.user.id + '&id=' + Date.now()
                      },
                    };
                    return data;
                  });
                  setMessages(messages);
                  setChatbox(documentSnapshot.id);
                });
            });
          });
      }
    }
  }, [isNewGroup, threadId]);
  function renderSend(props) {
    return (
      <Send {...props} textStyle={{borderRadius: 20}}>
        <View style={[{margin: 3, borderRadius: 20}]}>
          <Image
            source={sendButton}
            resizeMode="contain"
            style={{
              width: 40,
              height: 40,
            }}
          />
        </View>
      </Send>
    );
  }
  function renderInputBar(props) {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          borderRadius: 20,
          borderWidth: 0,
          marginHorizontal: 10,
        }}
        optionTintColor="black"
        primaryStyle={{
          borderWidth: 0,
          height: 50,
        }}
      />
    );
  }
  function renderBubble(props) {
    const {currentMessage} = props;
    return (
      <View
        style={{
          marginTop: 5,
          width: 180,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 5,
          }}>
          <Text
            style={{
              fontSize: 12,
              color: '#000',
              fontWeight: '400',
              letterSpacing: 0.2,
            }}>
            {currentMessage?.user?.name}
          </Text>
          <Text
            style={{
              fontSize: 12,
            }}>
            {format(new Date(currentMessage.created), 'KK:mm')}
          </Text>
        </View>
        <View
          style={{
            backgroundColor:
              currentMessage.user._id === user.uid ? '#30D5C8' : '#fff',
            borderTopRightRadius: 15,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            paddingVertical: 10,
            paddingHorizontal: 15,
          }}>
          <Text
            style={{
              color:
                currentMessage.user._id === user.uid
                  ? appTheme.COLORS.white
                  : '#000',
              fontSize: 12,
              fontWeight: '600',
            }}>
            {currentMessage?.text}
          </Text>
        </View>
        {currentMessage.user._id === user.uid && currentMessage.delivered ? (
          <Image
            source={Images.sentIcon}
            resizeMode="center"
            style={{
              width: 12,
              height: 20,
              alignSelf: 'flex-end',
              marginRight: 10,
            }}
          />
        ) : null}
      </View>
    );
  }
  return (
    <LinearGradient
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}
      colors={[
        appTheme.COLORS.lightPink,
        appTheme.COLORS.lightPink,
        appTheme.COLORS.lightPink,
        appTheme.COLORS.lightPink,
        appTheme.COLORS.lightGray,
        appTheme.COLORS.lightGray,
      ]}
      style={{
        flex: 1,
        paddingTop: insets.top
      }}>

      {Platform.OS === 'ios' ? (
          <Header onPress={() => navigation.goBack()} title={groupName} iHeight={{height: 30}} />
      ) : (
        <Header onPress={() => navigation.goBack()} title={groupName} />
      )}
          
      {isNewGroup ? (
        <>
        <View style={{
          backgroundColor : '#fff',
          width: '79%',
          borderRadius: 10,
          alignSelf: "center",
          flex: 1
        }}>
        {selectedUsers.length > 0 ? (
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 15,
                  marginTop: 10,
                  flexWrap: "wrap"
                }}>
                {selectedUsers.map(item => {
                  return (
                    <View
                      style={{
                        backgroundColor: 'lightgray',
                        borderRadius: 10,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        marginVertical: 10,
                        marginHorizontal: 3
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: 'bold',
                          color: 'blue',
                        }}>
                        {item.label}
                      </Text>
                    </View>
                  );
                })}
              </View>
            ) : null}
         <TextInput
              value={value}
              onChangeText={text => {
                console.log(
                  '🚀 ~ file: Message.js ~ line 78 ~ handleSearchUser ~ text',
                  text.length,
                );
                if (text.length === 0) return setFilteredUsers([]);
                const clone = [...items];
                const filter = clone.filter(item => {
                  if (item.label.toLowerCase().startsWith(text.toLowerCase())) {
                    return item;
                  }
                });
                setFilteredUsers(filter);
              }}
              style={{
                fontSize: 18,
                color: 'black',
                paddingLeft: 20,
                backgroundColor: 'white',
                // marginHorizontal: 40,
                borderRadius: 10,
                minWidth: 200,
                flexGrow: 1
              }}
              placeholder="Type Something"
            />
          </View>
            {filteredUsers.length > 0 ? (
              <>
                {filteredUsers.map((item, index) => {
                  return (
                    <View
                    key={index}
                    style={{
                      fontSize: 18,
                      color: 'black',
                      // padding: 20,
                      backgroundColor: 'white',
                      marginHorizontal: 40,
                      // borderRadius: 15,
                    }}>
                      <TouchableOpacity
                        onPress={() => {
                          
                          let result = selectedUsers.find((user) => {
                            return user === item;
                          });
                          
                          if(result){
                            Alert.alert('Already Added')
                          }else{
                            setSelectedUsers(pre => [...pre, item]);
                          }
                        }}>
                        <Text
                          style={{
                            color: 'black',
                            textAlign: 'center',
                            backgroundColor: 'lightgrey',
                            padding: 10,
                            borderWidth: 1,
                            borderColor: 'white',
                            fontSize: 20,
                            fontWeight: 'bold',
                          }}>
                          {item.label}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </>
            ) : null}
        </>
      ) : null}
      <View style={{flex: 1}}>
        <GiftedChat
          messages={messages}
          onSend={messages =>
            handleSend(messages)
          }
          user={{
            _id: user.uid,
          }}
          alwaysShowSend={true}
          placeholder={'Type a message'}
          showAvatarForEveryMessage={true}
          renderAvatarOnTop={true}
          renderBubble={renderBubble}
          renderDay={() => null}
          renderSend={renderSend}
          renderInputToolbar={renderInputBar}
          textInputProps={{
            color: 'black',
          }}
        />
      </View>
    </LinearGradient>
  );
};
