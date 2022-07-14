import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import {ThemeContext} from '../../App';
import {
  baseStyles,
  cardStyles,
  imageStyles,
  textStyles,
} from '../styles/Styles';
import {fetchPokemonData, getPokemonImage} from '../utils/Utils';

const SelectScreen = ({route}) => {
  const [pokemonData, setPokemonData] = useState();

  const {theme, favorite, setFavorite} = useContext(ThemeContext);

  useEffect(() => {
    fetchPokemonData(route.params.name).then(data => setPokemonData(data));
  }, [route]);

  const isFavorite = () => {
    return pokemonData?.name === favorite?.name;
  };

  return (
    <View
      style={[
        baseStyles.fill,
        baseStyles.padded,
        {backgroundColor: theme.primary},
      ]}>
      <View
        style={[
          cardStyles.container,
          baseStyles.margined,
          {backgroundColor: theme.secondary},
        ]}
      />
    </View>
  );
};

export default SelectScreen;
