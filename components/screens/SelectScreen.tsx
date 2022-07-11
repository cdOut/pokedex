import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useContext, useState} from 'react';
import {
  View,
  Text,
  Image,
  Button,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {ThemeContext} from '../../App';

interface IPokemonData {
  name: string;
  sprites: {front_default: string};
  stats: [];
  types: [];
}

interface IStat {
  base_stat: number;
  stat: {name: string};
}

interface IType {
  type: {name: string};
}

const SelectScreen = (props: {route?: any}) => {
  const theme = useContext(ThemeContext);

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
      <View
        style={[styles.selectContainer, {backgroundColor: theme.secondary}]}>
        {!isDataEmpty() && (
          <Image
            style={styles.selectImage}
            source={{uri: pokemonData.sprites.front_default}}
          />
        )}
        <Text style={[styles.selectText, {color: theme.text}]}>
          {!isDataEmpty() ? pokemonData.name : 'No favorites found'}
        </Text>
        {!isDataEmpty() && (
          <Button
            title={!isFavorite() ? 'Favorite' : 'Unfavorite'}
            onPress={handleFavoriteButton}
            color={theme.accent}
          />
        )}
        {props.route.params !== undefined && !isDataEmpty() && (
          <View style={styles.statSubsection}>
            <Text style={[styles.statTitle, {color: theme.text}]}>Stats</Text>
            {pokemonData.stats.map((stat: IStat) => {
              return (
                <View style={styles.statContainer} key={stat.stat.name}>
                  <Text style={[styles.statLabel, {color: theme.text}]}>
                    {stat.stat.name.replace('-', ' ').toUpperCase()}
                  </Text>
                  <Text style={[styles.statValue, {color: theme.text}]}>
                    {stat.base_stat}
                  </Text>
                </View>
              );
            })}
            <Text style={[styles.statTitle, {color: theme.text}]}>Types</Text>
            <View style={styles.typeContainer}>
              {pokemonData.types.map((type: IType) => {
                return (
                  <Text
                    key={type.type.name}
                    style={[styles.typeValue, {color: theme.text}]}>
                    {type.type.name}
                  </Text>
                );
              })}
            </View>
          </View>
        )}
        {isDataEmpty() && (
          <Text style={[styles.selectDescription, {color: theme.text}]}>
            Select your favorite pokemon from the pokedex and it will appear
            here.
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  statSubsection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  statTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  statContainer: {
    width: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  typeContainer: {
    width: 200,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statLabel: {
    color: 'gray',
    fontSize: 16,
  },
  statValue: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  typeValue: {
    fontSize: 20,
    textTransform: 'uppercase',
    fontStyle: 'italic',
    paddingLeft: 10,
    paddingRight: 10,
  },
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
