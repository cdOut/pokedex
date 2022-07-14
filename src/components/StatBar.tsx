import React from 'react';
import {View} from 'react-native';
import COLORS from '../styles/Colors';
import {STATSTYLES} from '../styles/Styles';
import {convertHexToOpacityRGBA} from '../utils/Utils';

const StatBar = ({type, value}: {type: string; value: number}) => {
  return (
    <View
      style={[
        STATSTYLES.statBar,
        {
          backgroundColor: convertHexToOpacityRGBA(
            COLORS[type as keyof typeof COLORS],
            0.3,
          ),
        },
      ]}>
      <View
        style={[
          STATSTYLES.statValue,
          {
            width: (value / 200) * 200,
            backgroundColor: COLORS[type as keyof typeof COLORS],
          },
        ]}
      />
    </View>
  );
};

export default StatBar;
