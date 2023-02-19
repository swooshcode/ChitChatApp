import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import ProgressBar from '../../components/progressBar/progressBar';
import appTheme from '../../constants/theme';
import Images from '../../Utils/Images';
import styles from './styles';

const Status = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={Images.statusBackground}
        resizeMode={'cover'}
        style={{flex: 1}}>
        <View style={styles.progressBarView}>
          <ProgressBar progress={1} width={appTheme.ALIGNMENT.wp('30%')} />
          <ProgressBar progress={1} width={appTheme.ALIGNMENT.wp('30%')} />
          <ProgressBar progress={1} width={appTheme.ALIGNMENT.wp('30%')} />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* <ImageIcon
            style={{
              marginLeft: 30,
              marginTop: 15,
              height: 45,
              width: 45,
            }}
            imgstyle={{width: 42, height: 42}}
            src={Images.img1}
          /> */}

          <Image style={styles.statusImage} source={Images.img1} />
          <Text style={styles.largeText}>Unarshia</Text>
          <Text style={styles.smallText}>NFT Project</Text>
        </View>
        <View style={styles.lastContainer}>
          <TouchableOpacity>
            <Image style={styles.smallIcon} source={Images.firstEmoji} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={styles.smallIcon} source={Images.secondEmoji} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={styles.smallIcon} source={Images.thirdEmoji} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={styles.smallIcon} source={Images.forthEmoji} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={styles.smallIcon} source={Images.fifthEmoji} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};
export default Status;
