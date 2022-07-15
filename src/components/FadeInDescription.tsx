import React, {useCallback, useEffect, useState} from 'react';
import {TextStyle} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {fetchPokemonDescription} from '../utils/Utils';

const FadeInDescription = ({id, styles}: {id: string; styles: TextStyle}) => {
  const [text, setText] = useState<string>('');

  const textOpacity = useSharedValue(0);

  const loadDescription = useCallback(async () => {
    const result = await fetchPokemonDescription(id, 2);
    setText(result.join(' '));
    textOpacity.value = withTiming(1, {
      duration: 400,
      easing: Easing.ease,
    });
  }, [id, textOpacity]);

  useEffect(() => {
    loadDescription();
  }, [loadDescription]);

  const fadeInStyles = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
    };
  });

  return <Animated.Text style={[fadeInStyles, styles]}>{text}</Animated.Text>;
};

export default FadeInDescription;
