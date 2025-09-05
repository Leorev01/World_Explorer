import React from 'react';
import { View, TextInput, StyleSheet, Platform } from 'react-native';

export default function SearchBar({
  value, onChangeText, placeholder = 'Search...',
}: { value: string; onChangeText: (t: string) => void; placeholder?: string }) {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#888"
        style={styles.input}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 12,
    paddingVertical: Platform.select({ ios: 10, android: 8, default: 8 }),
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  input: { fontSize: 16, color: '#111' },
});
