import React from 'react';
import {View, Image, Text} from 'react-native';
import {ABOUTSTYLES} from '../styles/Styles';

const AboutView = ({
  weight,
  height,
  moves,
}: {
  weight: number;
  height: number;
  moves: string[];
}) => {
  return (
    <View style={ABOUTSTYLES.container}>
      <View>
        <View style={ABOUTSTYLES.info}>
          <Image
            style={ABOUTSTYLES.weightImage}
            source={require('../assets/images/Weight.png')}
          />
          <Text>{weight / 10} kg</Text>
        </View>
        <Text style={ABOUTSTYLES.infoTitle}>Weight</Text>
      </View>
      <View style={ABOUTSTYLES.middleAbout}>
        <View style={ABOUTSTYLES.info}>
          <Image
            style={ABOUTSTYLES.heightImage}
            source={require('../assets/images/Height.png')}
          />
          <Text>{height / 10} m</Text>
        </View>
        <Text style={ABOUTSTYLES.infoTitle}>Height</Text>
      </View>
      <View>
        <View style={ABOUTSTYLES.infoMoves}>
          {moves.map((move, index) => (
            <Text style={ABOUTSTYLES.moveText} key={index}>
              {move.replace('-', ' ')}
            </Text>
          ))}
        </View>
        <Text style={ABOUTSTYLES.infoTitle}>Moves</Text>
      </View>
    </View>
  );
};

export default AboutView;
