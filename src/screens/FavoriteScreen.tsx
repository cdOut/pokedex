import React, {useContext} from 'react';
import {Button, SafeAreaView, Text, View} from 'react-native';
import {AppContext} from '../../App';
import FadeInImage from '../components/FadeInImage';
import {STYLES} from '../styles/Styles';
import {getPokemonImage} from '../utils/Utils';

const FavoriteScreen = () => {
  const {favorite} = useContext(AppContext);

  return (
    <SafeAreaView style={STYLES.fill}>
      <View>
        {favorite && (
          <FadeInImage styles={undefined} url={getPokemonImage(favorite!.id)} />
        )}
        <Text>{favorite ? favorite.name : 'No favorites found'}</Text>
        {favorite ? (
          <Button title="Unfavorite" />
        ) : (
          <Text>
            Select your favorite pokemon from the pokedex and it will appear
            here.
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default FavoriteScreen;
