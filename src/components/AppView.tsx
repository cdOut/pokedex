import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import FavoriteScreen from '../screens/FavoriteScreen';
import MapScreen from '../screens/MapScreen';
import {STYLES} from '../styles/Styles';
import ListStack from './ListStack';

const RootStack = createBottomTabNavigator();

const AppView = () => {
  return (
    <SafeAreaView style={STYLES.fill}>
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="ListStack">
          <RootStack.Screen name="Favorite" component={FavoriteScreen} />
          <RootStack.Screen
            options={{title: 'Pokedex'}}
            name="ListStack"
            component={ListStack}
          />
          <RootStack.Screen name="Map" component={MapScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default AppView;
