import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContinentsScreen from '../screens/ContinentsScreen';
import CountriesScreen from '../screens/CountriesScreen';
import CountryDetailScreen from '../screens/CountryDetailScreen';
import HomePage from '../screens/HomePageScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  HomePage: undefined;
  Profile: undefined;
  EditProfile: undefined;
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
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUpScreen} />
        <Stack.Screen options={{ headerShown: false }} name="HomePage" component={HomePage} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
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
