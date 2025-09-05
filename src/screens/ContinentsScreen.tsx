import React from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_CONTINENTS } from '../graphql/queries';
import type { Continent } from '../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Continents'>;

function mode<T>(arr: T[]): T | '—' {
  const m = new Map<T, number>();
  arr.forEach(v => m.set(v, (m.get(v) ?? 0) + 1));
  let best: T | undefined; let bestN = 0;
  for (const [v, n] of m) if (n > bestN) { best = v; bestN = n; }
  return (best ?? '—') as any;
}

export default function ContinentsScreen({ navigation }: Props) {
  const { data, loading, error, refetch } = useQuery(GET_CONTINENTS);

  if (loading) return <View style={{ flex:1, alignItems:'center', justifyContent:'center' }}><ActivityIndicator/></View>;
  if (error) return (
    <View style={{ flex:1, alignItems:'center', justifyContent:'center', padding:16 }}>
      <Text>Failed to load continents.</Text>
      <TouchableOpacity onPress={() => refetch()} style={{ marginTop:10 }}>
        <Text style={{ color:'#5b8cfe' }}>Retry</Text>
      </TouchableOpacity>
    </View>
  );

  const rows = (data?.continents ?? []).map((c: Continent) => {
    const count = c.countries.length;
    const currency = mode(c.countries.map(x => x.currency).filter(Boolean) as string[]);
    return { ...c, count, commonCurrency: currency };
    });

  return (
    <FlatList
      contentContainerStyle={{ padding: 12 }}
      data={rows}
      keyExtractor={(item) => item.code}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Countries', { continentCode: item.code, continentName: item.name })}
          style={{ backgroundColor:'#fff', borderRadius:12, borderWidth:1, borderColor:'#eee', padding:12, marginBottom:10 }}
        >
          <Text style={{ fontWeight:'700', fontSize:16 }}>{item.name}</Text>
          <Text style={{ color:'#666', marginTop:4 }}>
            {item.count} countries • common currency: {item.commonCurrency}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}
