import React, { useMemo, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_COUNTRIES } from '../graphql/queries';
import type { Country } from '../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import SearchBar from '../components/SearchBar';
import Chip from '../components/Chip';
import CountryCard from '../components/CountryCard';

type Props = NativeStackScreenProps<RootStackParamList, 'Countries'>;

function useDebounced<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  React.useEffect(() => { const id = setTimeout(() => setDebounced(value), delay); return () => clearTimeout(id); }, [value, delay]);
  return debounced;
}

export default function CountriesScreen({ navigation, route }: Props) {
  const continentCode = route.params?.continentCode;
  const { data, loading, error, refetch } = useQuery(GET_COUNTRIES);

  const [search, setSearch] = useState('');
  const [lang, setLang] = useState<string | null>(null);
  const [cur, setCur] = useState<string | null>(null);

  const debouncedSearch = useDebounced(search, 300);

  const all: Country[] = data?.countries ?? [];

  const languages = useMemo(
    () => Array.from(new Set(all.flatMap(c => c.languages.map(l => l.name)).filter(Boolean))).sort(),
    [all]
  );
  const currencies = useMemo(
    () => Array.from(new Set(all.map(c => c.currency).filter(Boolean))).sort() as string[],
    [all]
  );

  const filtered = useMemo(() => {
    return all
      .filter(c => !continentCode || c.continent?.code === continentCode)
      .filter(c => !debouncedSearch || c.name.toLowerCase().includes(debouncedSearch.toLowerCase()))
      .filter(c => !lang || c.languages.some(l => l.name === lang))
      .filter(c => !cur || c.currency === cur);
  }, [all, continentCode, debouncedSearch, lang, cur]);

  if (loading) return <View style={{ flex:1, alignItems:'center', justifyContent:'center' }}><ActivityIndicator/></View>;
  if (error) return <View style={{ flex:1, alignItems:'center', justifyContent:'center' }}><Text>Failed to load countries.</Text></View>;

  return (
    <View style={{ flex:1 }}>
      <View style={{ padding:12 }}>
        <SearchBar value={search} onChangeText={setSearch} placeholder="Search countries by name..." />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
          <Chip label={lang ?? 'Language'} active={!!lang} onPress={() => setLang(null)} />
          {languages.map(l => (
            <Chip key={l} label={l} active={lang === l} onPress={() => setLang(lang === l ? null : l)} />
          ))}
        </ScrollView>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
          <Chip label={cur ?? 'Currency'} active={!!cur} onPress={() => setCur(null)} />
          {currencies.map(c => (
            <Chip key={c} label={c} active={cur === c} onPress={() => setCur(cur === c ? null : c)} />
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.code}
        contentContainerStyle={{ padding: 12, paddingTop: 0, paddingBottom: 24 }}
        renderItem={({ item }) => (
          <CountryCard
            item={item}
            onPress={() => navigation.navigate('CountryDetail', { code: item.code, name: item.name })}
          />
        )}
        ListEmptyComponent={
          <View style={{ alignItems:'center', padding: 24 }}>
            <Text>No results. Try adjusting filters.</Text>
          </View>
        }
        refreshing={false}
        onRefresh={() => refetch()}
      />
    </View>
  );
}
