import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContinentsScreen from '../screens/ContinentsScreen';
import CountriesScreen from '../screens/CountriesScreen';
import CountryDetailScreen from '../screens/CountryDetailScreen';
import HomePage from '../screens/HomePageScreen';
import FavouritesScreen from '../screens/FavouritesScreen';

export type RootStackParamList = {
  HomePage: undefined;
  Favourites: undefined;
  Continents: undefined;
  Countries: { continentCode?: string; continentName?: string } | undefined;
  CountryDetail: { code: string; name: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name='Favourites' component={FavouritesScreen} />
        <Stack.Screen name="Continents" component={ContinentsScreen} />
        <Stack.Screen
          name="Countries"
          component={CountriesScreen}
          options={({ route }) => ({ title: route.params?.continentName ?? 'Countries' })}
        />
        <Stack.Screen
          name="CountryDetail"
          component={CountryDetailScreen}
          options={({ route }) => ({ title: route.params.name })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
