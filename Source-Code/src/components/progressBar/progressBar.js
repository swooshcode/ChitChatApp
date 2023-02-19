import React from 'react';
import {View} from 'react-native';
import * as Progress from 'react-native-progress';
const ProgressBar = props => {
  return (
    <View style={{alignSelf: 'center', marginRight: 10}}>
      <Progress.Bar
        progress={props.progress}
        width={props.width}
        color={'white'}
        unfilledColor={'white'}
        borderWidth={0}
        height={3}
        borderRadius={10}
      />
    </View>
  );
};
export default ProgressBar;
