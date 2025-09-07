import AsyncStorage from 'expo-sqlite/kv-store';
import { useEffect, useState } from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native'
import { Alert } from 'react-native';
import {useUsersRepo} from '../data/usersRepo'
import {Toast} from 'react-native-toast-message/lib/src/Toast'

const EditProfileScreen = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const { updateProfile } = useUsersRepo();

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await AsyncStorage.getItem('user');
            if (userData) {
                const { name, email } = JSON.parse(userData);
                setName(name);
                setEmail(email);
            }
        };
        fetchUserData();
    }, []);

    const handleSave = () => {
        Alert.alert(
            'Save Changes',
            'Are you sure you want to save changes?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'OK', onPress: async () => {
                    const userData = await AsyncStorage.getItem('user');
                    if (userData) {
                        const parsedUser = JSON.parse(userData);
                        await updateProfile(parsedUser.id, name, email);
                        const updatedUser = { ...parsedUser, name, email };
                        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
                        Toast.show({
                            type: 'success',
                            text1: 'Profile updated successfully'
                        });
                    }
                }},
            ]
        );
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <TextInput placeholder={name} style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder={email} style={styles.input} value={email} onChangeText={setEmail} />
      <Button title="Save Changes" onPress={handleSave} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
  },
});

export default EditProfileScreen