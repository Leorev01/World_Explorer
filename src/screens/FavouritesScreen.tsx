
import { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_COUNTRIES } from '../graphql/queries';
import { Country } from '../types';
import CountryCard from '../components/CountryCard';
import { useFavouriteContext } from '../context/FavouriteContext';

const FavouritesScreen = ({ navigation }: { navigation: any }) => {
  const { favourites } = useFavouriteContext();
  const [allCountries, setAllCountries] = useState<Country[]>([]);
  const { data, loading, error } = useQuery(GET_COUNTRIES);

  useEffect(() => {
    if (data && data.countries) {
      setAllCountries(data.countries);
    }
  }, [data]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  if (favourites.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No favourite countries added yet.</Text>
        <View style={styles.button}>
          <Button title='Browse Continents' onPress={() => navigation.navigate('Continents')} />
        </View>
      </View>
    );
  }

  const filteredCountries = allCountries.filter((country: Country) => favourites.includes(country.code));

  return (
    <View>
      {filteredCountries.map((country: Country) => (
        <CountryCard key={country.code} item={country} onPress={() => navigation.navigate('CountryDetail', { code: country.code, name: country.name })} />
      ))}
    </View>
  );
};

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
