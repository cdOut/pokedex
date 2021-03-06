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
import {IPokemon} from '../screens/ListScreen';

const PokemonCard = ({index, pokemon}: {index: number; pokemon: IPokemon}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<CardParamStackList>>();

  return (
    <Animated.View
      entering={ZoomIn}
      style={[
        parseInt(pokemon.id, 10) === -1
          ? CARDSTYLES.hidden
          : CARDSTYLES.container,
        (index - 1) % 3 === 0 ? CARDSTYLES.middle : undefined,
        {borderColor: COLORS[pokemon.types[0] as keyof typeof COLORS]},
      ]}>
      {parseInt(pokemon.id, 10) !== -1 && (
        <TouchableOpacity
          key={pokemon.id}
          onPress={() => navigation.navigate('Select', {pokemon: pokemon})}>
          <Text
            style={[
              CARDSTYLES.id,
              {color: COLORS[pokemon.types[0] as keyof typeof COLORS]},
            ]}>
            #{stringifyPokemonId(pokemon.id)}
          </Text>
          <FadeInImage
            styles={CARDSTYLES.image}
            url={getPokemonImage(pokemon.id)}
          />
          <View
            style={[
              CARDSTYLES.title,
              {
                backgroundColor:
                  COLORS[pokemon.types[0] as keyof typeof COLORS],
              },
            ]}>
            <Text style={CARDSTYLES.text}>{pokemon.name}</Text>
          </View>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

export default PokemonCard;
