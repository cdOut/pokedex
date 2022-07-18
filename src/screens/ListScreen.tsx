import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import {
  createPokemonObject,
  fetchAllPokemon,
  fetchPokemonData,
} from '../utils/Utils';

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
  const [pokemonAll, setPokemonALl] = useState([]);
  const [pokemonList, setPokemonList] = useState<IPokemon[]>([]);
  const [searched, setSearched] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);
  let flatListRef: FlatList<IPokemon> | null;
  let filteredNamesList = useRef<{name: string}[]>([]);
  let filterTimeout = useRef<number>(0);
  let filtered = useRef<IPokemon[] | undefined>(undefined);

  const fetchPokemon = useCallback(async () => {
    const result = await fetchAllPokemon();
    setPokemonALl(result);
  }, []);

  const fetchPokemonList = useCallback(async (offset: number) => {
    setRefreshing(true);
    let fetched: IPokemon[] = [];
    for (let i = 1; i <= 30; i++) {
      const result = await fetchPokemonData((offset + i).toString());
      fetched.push(createPokemonObject(result));
    }
    setPokemonList(prev => [...prev, ...fetched]);
    setRefreshing(false);
  }, []);

  const handleSearchChange = useCallback(async () => {
    if (searched) {
      setRefreshing(true);
      clearTimeout(filterTimeout.current);
      filteredNamesList.current = pokemonAll.filter(({name}: {name: string}) =>
        name.match(RegExp(searched?.toLowerCase())),
      );
      filterTimeout.current = setTimeout(async () => {
        let tempFiltered: IPokemon[] = [];
        for (const element of filteredNamesList.current) {
          const found = pokemonList.find(pokemon => {
            return pokemon.name === element.name;
          });
          if (found) {
            tempFiltered.push(found);
          } else {
            const result = await fetchPokemonData(element.name.toLowerCase());
            tempFiltered.push(createPokemonObject(result));
          }
        }
        while (tempFiltered.length % 3 !== 0) {
          const empty: IPokemon = {
            id: '-1',
            name: '',
            types: [],
            weight: 0,
            height: 0,
            moves: [],
            stats: [],
          };
          tempFiltered.push(empty);
        }
        filtered.current = tempFiltered;
        setRefreshing(false);
      }, 1500);
      return () => clearTimeout(filterTimeout.current);
    } else {
      if (filtered.current) {
        clearTimeout(filterTimeout.current);
        filtered.current = undefined;
        setRefreshing(false);
      }
    }
  }, [pokemonAll, pokemonList, searched]);

  useEffect(() => {
    handleSearchChange();
  }, [handleSearchChange]);

  useEffect(() => {
    fetchPokemon();
    fetchPokemonList(0);
  }, [fetchPokemon, fetchPokemonList]);

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
          style={[LISTSTYLES.searchBar]}
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
            if (!refreshing && searched?.length === 0) {
              fetchPokemonList(pokemonList.length);
            }
          }}
          columnWrapperStyle={LISTSTYLES.wrapper}
          data={filtered.current ? filtered.current : pokemonList}
          renderItem={({item, index}: {item: IPokemon; index: number}) => (
            <PokemonCard index={index} pokemon={item} />
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
