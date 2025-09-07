import { View, Text, Button, StyleSheet, Pressable } from "react-native"
import AsyncStorage from "expo-sqlite/kv-store"
import {Toast} from 'react-native-toast-message/lib/src/Toast'
import { useEffect, useState } from "react"
import { User } from "../types"
import {Alert} from 'react-native'

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
        Alert.alert(
            'Log Out',
            'Are you sure you want to log out?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: async () => {
                        await AsyncStorage.removeItem('user');
                        navigation.replace('Login');
                        Toast.show({
                            type: 'success',
                            text1: 'Logged out successfully'
                        });
                    }
                }
            ]
        );
    }
    return (
        <View style={styles.container}>
        <View>
            <Text style={styles.text}>Name: {user?.name}</Text>
            <Text style={styles.text}>Email: {user?.email}</Text>
            <Text style={styles.text}>
            Favourites: {user?.favourites ? JSON.parse(user.favourites).length : 0}
            </Text>
            <Pressable onPress={() => navigation.navigate('Favourites', {user})}>
            <Text style={{color: 'blue', marginVertical: 10}}>View Favourites</Text>
            </Pressable>
        </View>
        <View style={styles.buttons}>
            <Button title="Edit Profile" onPress={() => navigation.navigate('EditProfile')} />
            <Button color="red" title="Log Out" onPress={logOutHandler} />
        </View>
        
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        alignItems: 'center',
    },
    text:{
        fontSize: 18, marginVertical: 8
    },
    buttons:{
        marginTop: 20, width: '100%',
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default ProfileScreen