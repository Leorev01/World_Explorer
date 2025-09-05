import React from 'react'
import { FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native'

const HomePageScreen = ({ navigation }: { navigation: any }) => {
  return (
    <>
        <Text style={styles.header}>Welcome to World Explorer</Text>
        <FlatList
        contentContainerStyle={{ padding: 12 }}
        data={[
            { key: 'Continents', label: 'Lets Explore the World!' },
            { key: 'Favourites', label: 'Your Favourite Countries' },
        ]}
        renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate(item.key)}
                style={{ backgroundColor:'#fff', borderRadius:12, borderWidth:1, borderColor:'#eee', padding:12, marginBottom:10 }}>
            <Text>{item.label}</Text>
            </TouchableOpacity>
        )}
        />
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: '600',
    padding: 12,
    textAlign: 'center',
    marginTop: 50,

  },
});

export default HomePageScreen