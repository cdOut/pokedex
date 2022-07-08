import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  Image,
  Button,
  SafeAreaView,
  StyleSheet,
  AsyncStorage,
} from 'react-native';

interface IPokemonData {
  name: string;
  sprites: {front_default: string};
}

const SelectScreen = (props: {route?: any}) => {
  const [pokemonData, setPokemonData] = useState<IPokemonData>(
    {} as IPokemonData,
  );
  const [favorite, setFavorite] = useState<string>('');

  const fetchPokemonData = async (url: string) => {
    const response = await fetch(url);
    const json = await response.json();
    setPokemonData(json);
  };

  const saveFavoritePokemon = async (name: string) => {
    const value: string = name === favorite ? '' : name;
    await AsyncStorage.setItem('FAVORITE', value);
    setFavorite(value);
  };

  const loadFavoritePokemon = async () => {
    let value = await AsyncStorage.getItem('FAVORITE');
    if (!value) {
      value = '';
    }
    setFavorite(value);
  };

  useFocusEffect(
    useCallback(() => {
      loadFavoritePokemon();
      if (props.route.params !== undefined) {
        fetchPokemonData(props.route.params.url);
      } else {
        if (favorite !== '') {
          fetchPokemonData(`https://pokeapi.co/api/v2/pokemon/${favorite}/`);
        } else {
          setPokemonData({} as IPokemonData);
        }
      }
    }, [favorite, props.route.params]),
  );

  const isDataEmpty = () => {
    return Object.keys(pokemonData).length === 0;
  };

  const isFavorite = () => {
    return pokemonData.name === favorite;
  };

  const handleFavoriteButton = () => {
    if (isFavorite()) {
      saveFavoritePokemon('');
    } else {
      saveFavoritePokemon(pokemonData.name);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.selectContainer}>
        {!isDataEmpty() && (
          <Image
            style={styles.selectImage}
            source={{uri: pokemonData.sprites.front_default}}
          />
        )}
        <Text style={styles.selectText}>
          {!isDataEmpty() ? pokemonData.name : 'No favorites found'}
        </Text>
        {!isDataEmpty() && (
          <Button
            title={!isFavorite() ? 'Favorite' : 'Unfavorite'}
            onPress={handleFavoriteButton}
          />
        )}
        {isDataEmpty() && (
          <Text style={styles.selectDescription}>
            Select your favorite pokemon from the pokedex and it will appear
            here.
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  selectContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectImage: {
    width: 300,
    height: 300,
  },
  selectText: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  selectDescription: {
    padding: 30,
    fontSize: 20,
  },
});

export default SelectScreen;
