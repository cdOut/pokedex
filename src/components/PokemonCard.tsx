import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {getPokemonImage, stringifyPokemonId} from '../utils/Utils';
import {CardParamStackList} from './ListStack';
import {CARDSTYLES} from '../styles/Styles';
import COLORS from '../styles/Colors';
import Animated, {ZoomIn} from 'react-native-reanimated';
import FadeInImage from './FadeInImage';

const PokemonCard = ({
  name,
  id,
  type,
}: {
  name: string;
  id: string;
  type: string;
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<CardParamStackList>>();

  return (
    <Animated.View
      entering={ZoomIn}
      style={[
        CARDSTYLES.container,
        {borderColor: COLORS[type as keyof typeof COLORS]},
      ]}>
      <TouchableOpacity
        key={id}
        onPress={() => navigation.navigate('Select', {name: name, id: id})}>
        <Text
          style={[CARDSTYLES.id, {color: COLORS[type as keyof typeof COLORS]}]}>
          #{stringifyPokemonId(id)}
        </Text>
        <FadeInImage styles={CARDSTYLES.image} url={getPokemonImage(id)} />
        <View
          style={[
            CARDSTYLES.title,
            {backgroundColor: COLORS[type as keyof typeof COLORS]},
          ]}>
          <Text style={CARDSTYLES.text}>{name}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default PokemonCard;
