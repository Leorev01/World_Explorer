import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Chip({
  label, active, onPress,
}: { label: string; active?: boolean; onPress?: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.chip, active && styles.active]}
      accessibilityRole="button"
      accessibilityState={{ selected: !!active }}
    >
      <Text style={[styles.text, active && styles.activeText]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#d9d9e0',
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  active: { borderColor: '#5b8cfe', backgroundColor: '#eef3ff' },
  text: { color: '#111' },
  activeText: { color: '#223' },
});
