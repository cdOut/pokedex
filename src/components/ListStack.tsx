import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ListScreen from '../screens/ListScreen';
import SelectScreen from '../screens/SelectScreen';

export type CardParamStackList = {
  Select: {name: string; id: string};
};

const NativeStack = createNativeStackNavigator();

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

export default ListStack;
