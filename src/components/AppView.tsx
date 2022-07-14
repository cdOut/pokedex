import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FavoriteScreen from '../screens/FavoriteScreen';
import MapScreen from '../screens/MapScreen';
import COLORS from '../styles/Colors';
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
            tabBarStyle: {
              paddingTop: 10,
            },
            tabBarActiveTintColor: COLORS.DARK_GRAY,
          }}
          initialRouteName="ListStack">
          <RootStack.Screen
            name="Favorite"
            component={FavoriteScreen}
            options={{
              tabBarIcon: ({color, size}) => (
                <Image
                  style={{width: size, height: size, tintColor: color}}
                  source={require('../assets/images/Heart.png')}
                />
              ),
            }}
          />
          <RootStack.Screen
            options={{
              title: 'Pokedex',
              tabBarIcon: ({color, size}) => (
                <Image
                  style={{width: size, height: size, tintColor: color}}
                  source={require('../assets/images/PokeballIcon.png')}
                />
              ),
            }}
            name="ListStack"
            component={ListStack}
          />
          <RootStack.Screen
            name="Map"
            component={MapScreen}
            options={{
              tabBarIcon: ({color, size}) => (
                <Image
                  style={{width: size, height: size, tintColor: color}}
                  source={require('../assets/images/Map.png')}
                />
              ),
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default AppView;
