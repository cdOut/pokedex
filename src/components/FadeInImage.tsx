import React from 'react';
import {ImageStyle, StyleProp} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const FadeInImage = ({
  url,
  styles,
}: {
  url: string;
  styles: StyleProp<ImageStyle>;
}) => {
  const imageOpacity = useSharedValue(0);

  const fadeInStyles = useAnimatedStyle(() => {
    return {
      opacity: imageOpacity.value,
    };
  });

  return (
    <>
      <Animated.Image
        onLoadEnd={() =>
          (imageOpacity.value = withTiming(1, {
            duration: 400,
            easing: Easing.ease,
          }))
        }
        style={[styles, fadeInStyles]}
        source={{uri: url}}
      />
    </>
  );
};

export default FadeInImage;
