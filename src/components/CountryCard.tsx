import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { Country } from '../types';
import { useReactiveVar } from '@apollo/client';
import { favoriteCodesVar, toggleFavorite } from '../state/favourites';

export default function CountryCard({
  item, onPress,
}: { item: Country; onPress?: () => void }) {
  const favs = useReactiveVar(favoriteCodesVar);
  const isFav = favs.includes(item.code);

  return (
    <TouchableOpacity onPress={onPress} style={styles.card} activeOpacity={0.8}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.flag}>{item.emoji}</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.sub} numberOfLines={1}>
            {item.code} • {item.currency ?? '—'} • {item.languages.map(l => l.name).join(', ') || '—'}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => toggleFavorite(item.code)}
          accessibilityRole="button"
          accessibilityLabel={isFav ? 'Remove favorite' : 'Add favorite'}
          style={styles.starWrap}
        >
          <Text style={styles.star}>{isFav ? '★' : '☆'}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 12,
    marginBottom: 10,
  },
  flag: { fontSize: 24, marginRight: 10 },
  name: { fontSize: 16, fontWeight: '700', color: '#111' },
  sub: { color: '#666', marginTop: 2 },
  starWrap: { paddingHorizontal: 6, paddingVertical: 4, marginLeft: 8 },
  star: { fontSize: 20, color: '#5b8cfe' },
});
