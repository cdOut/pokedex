import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useContext} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ThemeContext} from '../App';

const PokemonCard = (props: {name: string; url: string}) => {
  const theme = useContext(ThemeContext);

  const getPokemonId = () => {
    const urlArray = props.url.split('/');
    return urlArray[urlArray.length - 2];
  };

  const getPokemonImage = () => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonId()}.png`;
  };

  type CardParamStackList = {
    Select: {url: string};
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<CardParamStackList>>();

  return (
    <TouchableOpacity
      style={[styles.cardContainer, {backgroundColor: theme.secondary}]}
      key={props.name}
      onPress={() => navigation.navigate('Select', {url: props.url})}>
      <Image style={styles.cardImage} source={{uri: getPokemonImage()}} />
      <Text style={[styles.cardTitle, {color: theme.text}]}>{props.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    margin: 5,
    paddingBottom: 20,
    borderRadius: 15,
    backgroundColor: '#dedede',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: 150,
    height: 150,
  },
  cardTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    fontSize: 16,
  },
});

export default PokemonCard;
