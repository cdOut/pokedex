import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import AboutView from '../components/AboutView';
import FadeInImage from '../components/FadeInImage';
import FavoriteButton from '../components/FavoriteButton';
import {CardParamStackList} from '../components/ListStack';
import StatsView from '../components/StatsView';
import TypeView from '../components/TypeView';
import COLORS from '../styles/Colors';
import {SELECTSTYLES, STYLES} from '../styles/Styles';
import {getPokemonImage, stringifyPokemonId} from '../utils/Utils';

type SelectScreenRouteProp = RouteProp<CardParamStackList>;

const SelectScreen = ({
  route,
  navigation,
}: {
  route: SelectScreenRouteProp;
  navigation: NativeStackNavigationProp<CardParamStackList>;
}) => {
  return (
    <View
      style={[
        STYLES.flex,
        {
          backgroundColor:
            COLORS[route.params.pokemon.types[0] as keyof typeof COLORS],
        },
      ]}>
      <View style={SELECTSTYLES.navContainer}>
        <Image
          style={SELECTSTYLES.pokeballImage}
          source={require('../assets/images/PokeballBackground.png')}
        />
        <View style={SELECTSTYLES.navMain}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={SELECTSTYLES.navImage}
              source={require('../assets/images/BackArrow.png')}
            />
          </TouchableOpacity>
          <Text style={SELECTSTYLES.navTitle}>{route.params.pokemon.name}</Text>
          <Text style={SELECTSTYLES.navId}>
            #{stringifyPokemonId(route.params.pokemon.id)}
          </Text>
        </View>
      </View>
      <View style={SELECTSTYLES.mainContainer}>
        <FadeInImage
          styles={SELECTSTYLES.pokemonImage}
          url={getPokemonImage(route.params.pokemon.id)}
        />
        <View style={SELECTSTYLES.typeContainer}>
          {route.params.pokemon.types.map(type => (
            <TypeView key={type} type={type} />
          ))}
        </View>
        <View>
          <FavoriteButton
            type={route.params.pokemon.types[0] as keyof typeof COLORS}
            pokemon={route.params.pokemon}
          />
        </View>
        <View>
          <Text
            style={[
              SELECTSTYLES.subtitle,
              STYLES.marginTop,
              {
                color:
                  COLORS[route.params.pokemon.types[0] as keyof typeof COLORS],
              },
            ]}>
            About
          </Text>
          <AboutView
            weight={route.params.pokemon.weight}
            height={route.params.pokemon.height}
            moves={route.params.pokemon.moves}
          />
        </View>
        <View>
          <Text
            style={[
              SELECTSTYLES.subtitle,
              STYLES.marginTop,
              {
                color:
                  COLORS[route.params.pokemon.types[0] as keyof typeof COLORS],
              },
            ]}>
            Base Stats
          </Text>
          <StatsView
            type={route.params.pokemon.types[0]}
            stats={route.params.pokemon.stats}
          />
        </View>
      </View>
    </View>
  );
};

export default SelectScreen;
