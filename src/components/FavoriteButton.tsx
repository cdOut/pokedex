import React, {useContext, useEffect, useState} from 'react';
import {TouchableOpacity, Image, Text} from 'react-native';
import {AppContext} from '../../App';
import {IPokemon} from '../screens/ListScreen';
import COLORS from '../styles/Colors';
import {SELECTSTYLES, STYLES} from '../styles/Styles';
import {saveStorageData, STORAGE_FAVORITE} from '../utils/Storage';

const FavoriteButton = ({
  type,
  pokemon,
}: {
  type: keyof typeof COLORS;
  pokemon: IPokemon;
}) => {
  const [toggled, setToggled] = useState<boolean>(false);

  const {favorite, setFavorite} = useContext(AppContext);

  useEffect(() => {
    if (favorite) {
      setToggled(pokemon.name === favorite.name);
    }
  }, [favorite, pokemon.name]);

  const handleOnPress = () => {
    if (toggled) {
      saveStorageData(STORAGE_FAVORITE, 'undefined');
      setFavorite(() => undefined);
    } else {
      saveStorageData(STORAGE_FAVORITE, JSON.stringify(pokemon));
      setFavorite(() => pokemon);
    }
    setToggled(prev => !prev);
  };

  return (
    <TouchableOpacity
      onPress={() => handleOnPress()}
      style={[
        SELECTSTYLES.button,
        STYLES.marginTop,
        {
          borderColor: COLORS[type],
          backgroundColor: toggled ? COLORS[type] : COLORS.WHITE,
        },
      ]}>
      <Image
        style={[
          SELECTSTYLES.buttonImage,
          {
            tintColor: toggled ? COLORS.WHITE : COLORS[type],
          },
        ]}
        source={require('../assets/images/Heart.png')}
      />
      <Text
        style={[
          SELECTSTYLES.buttonText,
          {
            color: toggled ? COLORS.WHITE : COLORS[type],
          },
        ]}>
        {toggled ? 'Unfavorite' : 'Favorite'}
      </Text>
    </TouchableOpacity>
  );
};

export default FavoriteButton;
