import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const PinnedChats = () => {
  const [pinnedChats, setPinnedChats] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('THREADS')
      .where('pinned', '==', true)
      .onSnapshot((querySnapshot) => {
        const pinnedChats = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();
          const data = {
            id: doc.id,
            ...firebaseData,
          };
          return data;
        });
        setPinnedChats(pinnedChats);
      });
    return unsubscribe;
  }, []);

  const handleUnpinChat = (id) => {
    firestore()
      .collection('THREADS')
      .doc(id)
      .update({
        pinned: false,
      })
      .then(() => console.log('Chat unpinned successfully!'))
      .catch((error) => console.error('Error unpinning chat: ', error));
  };

  const renderPinnedChatItem = ({ item }) => (
    <TouchableOpacity style={styles.chatItem}>
      <Text style={styles.chatTitle}>{item.groupName}</Text>
      <TouchableOpacity
        style={styles.unpinButton}
        onPress={() => handleUnpinChat(item.id)}
      >
        <Text style={styles.unpinButtonText}>Unpin</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pinned Chats</Text>
      <FlatList
        data={pinnedChats}
        renderItem={renderPinnedChatItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  chatList: {
    paddingBottom: 16,
  },
  chatItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#eee',
    borderRadius: 8,
    marginBottom: 8,
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  unpinButton: {
    backgroundColor: '#f00',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  unpinButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PinnedChats;
