import React from 'react';
import ListScreen from './components/screens/ListScreen';
import SelectScreen from './components/screens/SelectScreen';
import MapScreen from './components/screens/MapScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const RootStack = createBottomTabNavigator();
const NativeStack = createNativeStackNavigator();

const App = () => {
  const ListStack = () => {
    return (
      <NativeStack.Navigator initialRouteName="List">
        <NativeStack.Screen
          options={{headerShown: false}}
          name="Pokedex"
          component={ListScreen}
        />
        <NativeStack.Screen
          options={{title: 'Pokemon'}}
          name="Select"
          component={SelectScreen}
        />
      </NativeStack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="ListStack">
        <RootStack.Screen name="Favorite" component={SelectScreen} />
        <RootStack.Screen
          options={{title: 'Pokedex'}}
          name="ListStack"
          component={ListStack}
        />
        <RootStack.Screen name="Map" component={MapScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
