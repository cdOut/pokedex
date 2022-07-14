import React from 'react';
import {View, Text} from 'react-native';
import COLORS from '../styles/Colors';
import {SELECTSTYLES} from '../styles/Styles';

const TypeView = ({type}: {type: string}) => {
  return (
    <View
      style={[
        SELECTSTYLES.type,
        {backgroundColor: COLORS[type as keyof typeof COLORS]},
      ]}>
      <Text style={SELECTSTYLES.typeText}>{type}</Text>
    </View>
  );
};

export default TypeView;
