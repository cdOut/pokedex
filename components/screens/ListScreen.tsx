import React, {useContext, useEffect, useState} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {ThemeContext} from '../../App';
import PokemonCard from '../PokemonCard';

interface ILayout {
  layoutMeasurement: {height: number};
  contentOffset: {y: number};
  contentSize: {height: number};
}

interface IItem {
  item: {
    name: string;
    url: string;
  };
}

const ListScreen = () => {
  const [pokemonList, setPokemonList] = useState<object[]>([]);

  const theme = useContext(ThemeContext);

  const fetchPokemonList = async () => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${pokemonList.length}`,
    );
    const json = await response.json();
    setPokemonList([...pokemonList, ...json.results]);
  };

  // this works, had to block eslint
  useEffect(() => {
    fetchPokemonList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: ILayout) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  return (
    <>
      <SafeAreaView>
        <FlatList
          style={{backgroundColor: theme.primary}}
          onScroll={({nativeEvent}) => {
            if (isCloseToBottom(nativeEvent)) {
              fetchPokemonList();
            }
          }}
          scrollEventThrottle={400}
          data={pokemonList as []}
          renderItem={({item}: IItem) => (
            <PokemonCard name={item.name} url={item.url} />
          )}
          horizontal={false}
          numColumns={2}
          onEndReachedThreshold={0}
        />
      </SafeAreaView>
    </>
  );
};

export default ListScreen;
