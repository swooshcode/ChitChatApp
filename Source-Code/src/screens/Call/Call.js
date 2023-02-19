import React from 'react';
import {View, Image, ScrollView} from 'react-native';
import {styles} from './style';
import Images from '../../Utils/Images';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TextComponent from '@components/textComponent/TextComponent';
import ToggleButton from '@components/toggleButton/ToggleButton';
import InputComponent from '@components/InputComponent/InputComponent';
import MessageComponent from '@components/messageComponent/MessageComponent';

const Call = ({navigation}) => {
  const insets = useSafeAreaInsets()
  
  const dialvideoCall = () => {
    navigation.navigate('VideoCall');
  };
  const dialphoneCall = () => {
    navigation.navigate('PhoneCall');
  };
  return (
    <View style={{...styles.container, paddingTop: insets.top}}>
      <TextComponent style={styles.title} title label="Calls" />

      <ToggleButton style={styles.toggleBtn} toggle={(state) => console.log(state)}/>

      <View style={styles.inputCon}>
        <InputComponent placeholder="Search anything..." />
        <Image source={Images.searchLogo} style={styles.searchPic} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{alignItems: 'center',marginBottom:60}}>
          <MessageComponent
            onPress={() => dialphoneCall()}
            label={'Mahdi Fadaee'}
            dpImg={Images.img2}
            style={styles.msgcomponent}
            status={'online'}
            type={'call'}
            statsIcon={'missCall'}
          />

          <MessageComponent
            onPress={() => dialvideoCall()}
            label={'Arman'}
            dpImg={Images.img1}
            style={styles.msgcomponent}
            type={'videoCall'}
            statsIcon={'dial'}
          />

          <MessageComponent
            label={'Hooman Abasi'}
            dpImg={Images.img5}
            style={styles.msgcomponent}
            type={'videoCall'}
            statsIcon={'dial'}
          />

          <MessageComponent
            label={'Milad Ghanbari'}
            dpImg={Images.img3}
            style={styles.msgcomponent}
            type={'call'}
            statsIcon={'missCall'}
            status={'online'}
          />

          <MessageComponent
            label={'Arman'}
            dpImg={Images.img4}
            style={styles.msgcomponent}
            type={'videoCall'}
            statsIcon={'dial'}
          />

          <MessageComponent
            label={'Arman'}
            dpImg={Images.img5}
            style={styles.msgcomponent}
            type={'videoCall'}
            statsIcon={'dial'}
          />

        
        </View>
      </ScrollView>
    </View>
  );
};
export default Call;
