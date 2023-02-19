import React from "react";
import { View, Text, FlatList, ImageBackground, Image, TouchableOpacity, Modal, Alert, StyleSheet, Pressable } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { COLORS } from "@constants/theme";
import ImageBtn from '@components/imageBtn/ImageBtn';
import Images from '../../Utils/Images';
import appTheme from "@constants/theme";
import TextComponent from '@components/textComponent/TextComponent';
import { FONTS } from "../../constants/theme";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { fi } from "date-fns/locale";
import auth from '@react-native-firebase/auth';
import InputComponent from "../../components/InputComponent/InputComponent";


const Button = ({ onPressHandler, text }) => {
    return (
        <Pressable onPress={onPressHandler} style={{
            backgroundColor: "#30D5C8",
            width: '70%',
            paddingVertical: 10,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
        }}>
            <Text style={{ ...FONTS.h3, color: COLORS.white }}>{text}</Text>
        </Pressable>
    )
}


const Header = (props) => {
    return (
        <ImageBackground
            source={Images.headerBG}
            style={{
                width: appTheme.ALIGNMENT.wp('100%'),
                height: appTheme.ALIGNMENT.hp(9),
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
            <ImageBtn
                onPress={props.onPress}
                style={{ marginLeft: 30, padding: 10 }}
                source={Images.backArrow}
            />
            <View style={{ alignItems: 'center' }}>
                <TextComponent title label="Users" />
                {/* <TextComponent time label="22 Members . 12 Online" /> */}
            </View>
            <Text></Text>
        </ImageBackground>
    );
};
const ListItem = ({ item, onPressHandler, onSelectItem }) => {
    return (
        <TouchableOpacity
            onPressIn={onPressHandler}
            style={{
                height: 60,
                flexDirection: "row",
                justifyContent: "space-between",
                width: '90%',
                alignSelf: "center",
                alignItems: "center",
                paddingHorizontal: 10,
            }}>
            <Text style={{
                ...FONTS.h3
            }}>{item.name}</Text>
            {/* <TouchableOpacity style={[{
                width: 20,
                height: 20,
                borderWidth: 1,
                borderColor: Colors.gray,
                borderRadius: 5
            }, { backgroundColor: item.selected ? COLORS.gray : Colors.white }]} onPress={onSelectItem} >

            </TouchableOpacity> */}
            {/* <Text>{item.email}</Text> */}
        </TouchableOpacity >
    )
}



export const People = ({ navigation }) => {
    const [allUsers, setAllUsers] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [groupName, setGroupName] = React.useState('');
    React.useEffect(() => {
        const unsubscribe = firestore()
            .collection('Users')
            .onSnapshot(querySnapshot => {
                const allUsers = querySnapshot.docs.map(documentSnapshot => {
                    return {
                        ...documentSnapshot.data(),
                        selected: false
                    };
                });
                setAllUsers(allUsers);
                console.log(allUsers, 'all userss');
            });
        return () => unsubscribe();
    }, []);
    const onSelectItemHandler = (person) => {
        setAllUsers(current => {
            const mapped = current.map(item => {
                if (item.id === person.id) {
                    return {
                        ...item,
                        selected: !item.selected
                    }
                } else return item
            })
            return mapped;
        })
    }
    const renderItem = ({ item }) => <ListItem item={item} onPressHandler={() => navigation.navigate('Chat', { chatUser: item, headerName: item.name })} onSelectItem={() => onSelectItemHandler(item)} />
    const createGroup = () => {
        console.log('new Group')
        const LoggedInUser = auth().currentUser;
        const filter = allUsers.filter(item => {
            if (LoggedInUser.uid === item.id || item.selected) return item
        })
        firestore()
            .collection('THREADS')
            .add({
                latestMessage: {
                    text: "Group has been created",
                    created: new Date().getTime(),
                    userid: LoggedInUser.uid.toString(),
                    username: LoggedInUser.displayName,
                },
                userid: [...filter.map(item => item.id)],
                //   userid: [chatUser.id.toString(), user.uid.toString()],
                users: [...filter.map((item) => {
                    return {
                        id: item.id,
                        name: item.name
                    }
                })],
                groupName,
                isGroup: true
            })
            .then(docRef => {
                docRef.collection('MESSAGES').add({
                    message: `${groupName} has been created`,
                    created: new Date().getTime(),
                    user: {
                        id: LoggedInUser.uid,
                        name: LoggedInUser.displayName,
                    },
                });
            }).then(res => {
                navigation.goBack();
            })
    }

    return (
        <View >
            <Header onPress={() => navigation.goBack()} onGroupPressHandler={() => setModalVisible(true)} />
            <FlatList
                data={allUsers}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={{ height: 2, backgroundColor: COLORS.gray, width: '90%', alignSelf: 'center' }} />}
                ListFooterComponent={<Button text={"New Group"} onPressHandler={() => navigation.navigate("Chat", { newGroup: true, chatUser: allUsers })} />}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={[styles.modalView, { marginHorizontal: 20 }]}>
                        <Text style={{ ...FONTS.h4, marginVertical: 20 }}>Group Name</Text>
                        <InputComponent value={groupName} onChangeText={(text) => {
                            setGroupName(text)
                        }}
                            placeholder="Enter group name"
                            style={{
                                borderColor: Colors.gray,
                                borderWidth: 1
                            }}
                        />
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-around",
                            width: '100%'
                        }}>

                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={createGroup}
                            >
                                <Text style={styles.textStyle}>Create Group</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal >
        </View >
    )
}


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
})
