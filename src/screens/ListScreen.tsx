import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Image, Text, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PokemonCard from '../components/PokemonCard';
import COLORS from '../styles/Colors';
import {LISTSTYLES, STYLES, TXTSTYLES} from '../styles/Styles';
import {fetchPokemonData} from '../utils/Utils';

interface IItem {
  id: string;
  name: string;
  type: string;
}

const ListScreen = () => {
  const [pokemonList, setPokemonList] = useState<IItem[]>([]);
  const [searched, setSearched] = useState<string>();
  const [refreshing, setRefreshing] = useState(false);

  const fetchPokemonList = useCallback(async (offset: number) => {
    setRefreshing(true);
    let fetched: IItem[] = [];
    for (let i = 1; i <= 15; i++) {
      const result = await fetchPokemonData((offset + i).toString());
      let item: IItem = {
        id: result.id,
        name: result.name,
        type: result.types[0].type.name.toUpperCase(),
      };
      fetched.push(item);
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
            source={require('../assets/images/Pokeball.png')}
          />
          <Text style={TXTSTYLES.bigtitle}>Pokédex</Text>
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
          renderItem={({item}) => (
            <PokemonCard
              key={item.name}
              name={item.name}
              id={item.id}
              type={item.type}
            />
          )}
          horizontal={false}
          numColumns={3}
          removeClippedSubviews={true}
        />
      </View>
    </View>
  );
};

export default ListScreen;
