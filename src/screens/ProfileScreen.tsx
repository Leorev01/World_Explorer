import { View, Text, Button, StyleSheet, Pressable } from "react-native"
import AsyncStorage from "expo-sqlite/kv-store"
import {Toast} from 'react-native-toast-message/lib/src/Toast'
import { useEffect, useState } from "react"
import { User } from "../types"

const ProfileScreen = ({navigation}: {navigation: any}) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await AsyncStorage.getItem('user');
            if (userData) {
                setUser(JSON.parse(userData));
            } else {
                setUser(null);
                navigation.replace('Login');
            }
        };
        fetchUser();
    }, []);

    const logOutHandler = async () => {
        await AsyncStorage.removeItem('user');
        navigation.replace('Login');
        Toast.show({
            type: 'success',
            text1: 'Logged out successfully'
        });
    }
  return (
    <View style={styles.container}>
        <View>
            <Text>Name: {user?.name}</Text>
            <Text>Email: {user?.email}</Text>
            <Text>
            Favourites: {user?.favourites ? JSON.parse(user.favourites).length : 0}
            </Text>
            <Pressable onPress={() => navigation.navigate('Favourites', {user})}>
            <Text style={{color: 'blue', marginVertical: 10}}>View Favourites</Text>
            </Pressable>
        </View>
        <Button title="Edit Profile" onPress={() => navigation.navigate('EditProfile')} />
        <Button title="Log Out" onPress={logOutHandler} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default ProfileScreen