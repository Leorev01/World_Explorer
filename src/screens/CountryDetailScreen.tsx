import React from 'react';
import { View, Text, ActivityIndicator, ScrollView, FlatList } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_COUNTRY, GET_COUNTRIES } from '../graphql/queries';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import type { Country } from '../types';
import Chip from '../components/Chip';
import { useReactiveVar } from '@apollo/client';
import { favoriteCodesVar, toggleFavorite } from '../state/favourites';

type Props = NativeStackScreenProps<RootStackParamList, 'CountryDetail'>;

export default function CountryDetailScreen({ route, navigation }: Props) {
  const { code } = route.params;
  const favs = useReactiveVar(favoriteCodesVar);

  const { data, loading, error } = useQuery(GET_COUNTRY, { variables: { code } });
  const countriesQuery = useQuery(GET_COUNTRIES); // for combined data

  if (loading) return <View style={{ flex:1, alignItems:'center', justifyContent:'center' }}><ActivityIndicator/></View>;
  if (error || !data?.country) return <View style={{ flex:1, alignItems:'center', justifyContent:'center' }}><Text>Failed to load country.</Text></View>;

  const c = data.country as Country;
  const all: Country[] = countriesQuery.data?.countries ?? [];

  const similarCurrency = c.currency
    ? all.filter(x => x.currency === c.currency && x.code !== c.code).slice(0, 12)
    : [];
  const neighborLangs = all.filter(x =>
    x.continent?.code === c.continent?.code &&
    x.code !== c.code &&
    x.languages.some(l => c.languages.map(k => k.code).includes(l.code))
  ).slice(0, 12);

  const isFav = favs.includes(c.code);

  return (
    <ScrollView contentContainerStyle={{ padding: 12, paddingBottom: 32 }}>
      <View style={{ backgroundColor:'#fff', borderRadius:12, borderWidth:1, borderColor:'#eee', padding:12 }}>
        <Text style={{ fontSize:32 }}>{c.emoji}</Text>
        <Text style={{ fontSize:22, fontWeight:'800', marginTop:4 }}>{c.name}</Text>
        {/*<Text style={{ color:'#666', marginTop:2 }}>{c.native ? `Native: ${c.native}` : ''}</Text>*/}
        <Text style={{ color:'#666', marginTop:2 }}>Capital: {c.capital ?? '—'}</Text>
        <Text style={{ color:'#666', marginTop:2 }}>Currency: {c.currency ?? '—'}</Text>
        <Text style={{ color:'#666', marginTop:2 }}>Phone code: +{c.phone ?? '—'}</Text>
        <Text style={{ color:'#666', marginTop:2 }}>Continent: {c.continent?.name ?? '—'}</Text>

        <View style={{ flexDirection:'row', alignItems:'center', marginTop:10 }}>
          <Text style={{ marginRight:8, fontWeight:'700' }}>Languages:</Text>
          <FlatList
            horizontal
            data={c.languages}
            keyExtractor={(l) => l.code}
            renderItem={({ item }) => <Chip label={item.name} />}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={{ marginTop:12 }}>
          <Chip label={isFav ? '★ Favorited' : '☆ Favorite'} active={isFav} onPress={() => toggleFavorite(c.code)} />
        </View>
      </View>

      {c.currency ? (
        <View style={{ marginTop:16 }}>
          <Text style={{ fontWeight:'800', fontSize:16, marginBottom:8 }}>Similar currency ({c.currency})</Text>
          <FlatList
            horizontal
            data={similarCurrency}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <Chip
                label={item.name}
                onPress={() => navigation.push('CountryDetail', { code: item.code, name: item.name })}
              />
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      ) : null}

      <View style={{ marginTop:16 }}>
        <Text style={{ fontWeight:'800', fontSize:16, marginBottom:8 }}>Neighbor languages (same continent)</Text>
        <FlatList
          horizontal
          data={neighborLangs}
          keyExtractor={(item) => item.code}
          renderItem={({ item }) => (
            <Chip
              label={`${item.name}`}
              onPress={() => navigation.push('CountryDetail', { code: item.code, name: item.name })}
            />
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
}
