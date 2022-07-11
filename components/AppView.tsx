import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useContext} from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {ThemeContext, themes} from '../App';
import ListScreen from './screens/ListScreen';
import MapScreen from './screens/MapScreen';
import SelectScreen from './screens/SelectScreen';

const RootStack = createBottomTabNavigator();
const NativeStack = createNativeStackNavigator();

const AppView = () => {
  const theme = useContext(ThemeContext);

  const ListStack = () => {
    return (
      <NativeStack.Navigator
        initialRouteName="List"
        screenOptions={{
          headerStyle: [{backgroundColor: theme.primary}],
          headerTitleStyle: [{color: theme.text}],
          headerTintColor: theme.accent,
        }}>
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

  const STATUSBAR_HEIGHT = StatusBar.currentHeight;
  const APPBAR_HEIGHT = Platform.OS === 'ios' ? 48 : 56;

  StatusBar.setBarStyle(
    theme === themes.dark ? 'light-content' : 'default',
    true,
  );

  return (
    <View style={styles.mainContainer}>
      <View style={[styles.statusBar, {height: STATUSBAR_HEIGHT}]}>
        <SafeAreaView>
          <StatusBar translucent backgroundColor={theme.primary} />
        </SafeAreaView>
      </View>
      <View style={{height: APPBAR_HEIGHT, backgroundColor: theme.primary}} />
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: [
              {backgroundColor: theme.primary, borderTopColor: theme.secondary},
            ],
            tabBarLabelStyle: [{color: theme.text}],
            tabBarActiveTintColor: theme.accent,
          }}
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
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  statusBar: {
    position: 'absolute',
  },
});

export default AppView;
