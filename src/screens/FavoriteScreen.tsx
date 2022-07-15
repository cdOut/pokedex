import React, {useContext} from 'react';
import {Image, Text, View} from 'react-native';
import {AppContext} from '../../App';
import AboutView from '../components/AboutView';
import FadeInImage from '../components/FadeInImage';
import FavoriteButton from '../components/FavoriteButton';
import TypeView from '../components/TypeView';
import COLORS from '../styles/Colors';
import {SELECTSTYLES, STYLES} from '../styles/Styles';
import {getPokemonImage, stringifyPokemonId} from '../utils/Utils';

const FavoriteScreen = () => {
  const {favorite} = useContext(AppContext);

  return (
    <View
      style={[
        STYLES.flex,
        {
          backgroundColor: favorite
            ? COLORS[favorite.types[0] as keyof typeof COLORS]
            : COLORS.PLACEHOLDER,
        },
      ]}>
      <View style={SELECTSTYLES.navContainer}>
        <Image
          style={SELECTSTYLES.pokeballImage}
          source={require('../assets/images/PokeballBackground.png')}
        />
        <View style={SELECTSTYLES.navMain}>
          <Image
            style={[SELECTSTYLES.navImage, {tintColor: COLORS.WHITE}]}
            source={require('../assets/images/Heart.png')}
          />
          <Text style={SELECTSTYLES.navTitle}>
            {favorite ? favorite.name : 'No favorites'}
          </Text>
          <Text style={SELECTSTYLES.navId}>
            #{favorite ? stringifyPokemonId(favorite.id) : '000'}
          </Text>
        </View>
      </View>
      {!favorite && (
        <View style={SELECTSTYLES.mainContainer}>
          <Image
            style={SELECTSTYLES.pokemonImage}
            source={require('../assets/images/PokemonPlaceholder.png')}
          />
          <View style={SELECTSTYLES.typeContainer}>
            <TypeView type={'TYPE'} />
            <TypeView type={'TYPE'} />
          </View>
          <View>
            <Text
              style={[
                SELECTSTYLES.subtitle,
                STYLES.marginTop,
                {
                  color: COLORS.PLACEHOLDER,
                },
              ]}>
              About
            </Text>
            <AboutView weight={0} height={0} moves={['None', 'None']} />
          </View>
          <View style={STYLES.marginTopBig}>
            <Text
              style={[
                SELECTSTYLES.subtitle,
                STYLES.marginTop,
                {
                  color: COLORS.PLACEHOLDER,
                },
              ]}>
              Description
            </Text>
            <Text style={SELECTSTYLES.description}>
              Browse the pokedex to find your favorite pokemon and you will be
              able to see some additional info about him here.
            </Text>
          </View>
        </View>
      )}
      {favorite && (
        <View style={SELECTSTYLES.mainContainer}>
          <FadeInImage
            styles={SELECTSTYLES.pokemonImage}
            url={getPokemonImage(favorite.id)}
          />
          <View style={SELECTSTYLES.typeContainer}>
            {favorite.types.map(type => (
              <TypeView key={type} type={type} />
            ))}
          </View>
          <View>
            <FavoriteButton
              type={favorite.types[0] as keyof typeof COLORS}
              pokemon={favorite}
            />
          </View>
          <View>
            <Text
              style={[
                SELECTSTYLES.subtitle,
                STYLES.marginTop,
                {
                  color: COLORS[favorite.types[0] as keyof typeof COLORS],
                },
              ]}>
              About
            </Text>
            <AboutView
              weight={favorite.weight}
              height={favorite.height}
              moves={favorite.moves}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default FavoriteScreen;
