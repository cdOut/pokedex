import React, {useCallback, useContext, useEffect, useState} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {ThemeContext} from '../../App';
import PokemonCard from '../PokemonCard';

type Item = {
  name: string;
  url: string;
};

const ListScreen = () => {
  const [pokemonList, setPokemonList] = useState<Item[]>([]);

  const theme = useContext(ThemeContext);

  const fetchPokemonList = useCallback(async (offset: number) => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`,
    );
    const json = await response.json();
    setPokemonList(prev => [...prev, ...json.results]);
  }, []);

  useEffect(() => {
    fetchPokemonList(0);
  }, [fetchPokemonList]);

  return (
    <>
      <SafeAreaView>
        <FlatList
          style={{backgroundColor: theme.primary}}
          onEndReached={() => fetchPokemonList(pokemonList.length)}
          data={pokemonList}
          renderItem={({item}) => (
            <PokemonCard key={item.name} name={item.name} url={item.url} />
          )}
          horizontal={false}
          numColumns={2}
        />
      </SafeAreaView>
    </>
  );
};

export default ListScreen;
