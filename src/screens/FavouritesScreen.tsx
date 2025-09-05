import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { favoriteCodesVar } from '../state/favourites'
import { useQuery, useReactiveVar } from '@apollo/client';
import { GET_COUNTRIES } from '../graphql/queries';
import { Country } from '../types';
import CountryCard from '../components/CountryCard';

const FavouritesScreen = ({ navigation }: { navigation: any }) => {


    const favoriteCodes = useReactiveVar(favoriteCodesVar);
    const { data, loading, error } = useQuery(GET_COUNTRIES, {
        variables: { codes: favoriteCodes }
    });

    if(loading) return <Text>Loading...</Text>;
    if(error) return <Text>Error: {error.message}</Text>;
    if(favoriteCodes.length === 0) {
    return(
      <View style={styles.container}>
        <Text>No favourite countries added yet.</Text>
        <View style={styles.button}>
          <Button title='Browse Continents' onPress={() => navigation.navigate('Continents')} />
        </View>
      </View>
    )
  }

    const filteredCountries = data.countries.filter((country: Country) => favoriteCodes.includes(country.code));

  return (
    <View>
      {data && data.countries && filteredCountries.map((country: Country) => (
        <CountryCard key={country.code} item={country} onPress={() => navigation.navigate('CountryDetail', { code: country.code, name: country.name })} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16
  },
  button: {
    backgroundColor: 'white',
    padding: 6,
    borderRadius: 5,
    marginTop: 10
  }
});

export default FavouritesScreen
