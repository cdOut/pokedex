import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  ZoomInEasyDown,
  ZoomOutEasyDown,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import PokemonCard from '../components/PokemonCard';
import COLORS from '../styles/Colors';
import {LISTSTYLES, LOADSTYLE, STYLES, TXTSTYLES} from '../styles/Styles';
import {fetchPokemonData} from '../utils/Utils';

export interface IPokemon {
  id: string;
  name: string;
  types: string[];
  weight: number;
  height: number;
  moves: string[];
  stats: number[];
}

const ListScreen = () => {
  const [pokemonList, setPokemonList] = useState<IPokemon[]>([]);
  const [searched, setSearched] = useState<string>();
  const [refreshing, setRefreshing] = useState(false);
  let flatListRef: FlatList<IPokemon> | null;

  const fetchPokemonList = useCallback(async (offset: number) => {
    setRefreshing(true);
    let fetched: IPokemon[] = [];
    for (let i = 1; i <= 30; i++) {
      const result = await fetchPokemonData((offset + i).toString());
      let pokemon: IPokemon = {
        id: result.id,
        name: result.name,
        types: result.types.map((type: {type: {name: string}}) =>
          type.type.name.toUpperCase(),
        ),
        weight: result.weight,
        height: result.height,
        moves: result.abilities.map(
          (ability: {ability: {name: string}}) => ability.ability.name,
        ),
        stats: result.stats.map((stat: {base_stat: number}) => stat.base_stat),
      };
      fetched.push(pokemon);
    }
    setPokemonList(prev => [...prev, ...fetched]);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchPokemonList(0);
  }, [fetchPokemonList]);

  return (
    <View style={[LISTSTYLES.container]}>
      <SafeAreaView style={[STYLES.flex]}>
        <View style={LISTSTYLES.titleContainer}>
          <Image
            style={LISTSTYLES.titleImage}
            source={require('../assets/images/PokeballIcon.png')}
          />
          <Text style={TXTSTYLES.bigtitle}>Pokédex</Text>
          <TouchableOpacity
            style={LISTSTYLES.scrollContainer}
            onPress={() => {
              flatListRef!.scrollToOffset({animated: true, offset: 0});
            }}>
            <Text style={LISTSTYLES.scrollText}>#</Text>
            <Image
              style={LISTSTYLES.scrollImage}
              source={require('../assets/images/UpArrow.png')}
            />
          </TouchableOpacity>
        </View>
        <TextInput
          style={LISTSTYLES.searchBar}
          onChangeText={setSearched}
          value={searched}
          placeholder="Search"
          placeholderTextColor={COLORS.MEDIUM_GRAY}
        />
      </SafeAreaView>
      <View style={LISTSTYLES.list}>
        <FlatList
          ref={ref => {
            flatListRef = ref;
          }}
          refreshing={refreshing}
          onEndReached={() => {
            if (!refreshing) {
              fetchPokemonList(pokemonList.length);
            }
          }}
          columnWrapperStyle={LISTSTYLES.wrapper}
          data={pokemonList.filter(pokemon => {
            return pokemon.name.match(
              RegExp((searched ? searched : '').toLowerCase()),
            );
          })}
          renderItem={({item}: {item: IPokemon}) => (
            <PokemonCard pokemon={item} />
          )}
          horizontal={false}
          numColumns={3}
          removeClippedSubviews={true}
        />
        {refreshing && (
          <Animated.View
            style={LOADSTYLE.container}
            entering={ZoomInEasyDown}
            exiting={ZoomOutEasyDown}>
            <Image
              style={LOADSTYLE.image}
              source={require('../assets/images/Loading.gif')}
            />
            <Text style={LOADSTYLE.text}>Loading...</Text>
          </Animated.View>
        )}
      </View>
    </View>
  );
};

export default ListScreen;
