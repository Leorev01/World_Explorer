import {useState} from 'react'
import { View, Text, TextInput, Button, StyleSheet, Pressable } from 'react-native'
import db from '../../mock-db/db.json'

const Logincreen = ({navigation}: {navigation: any}) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | undefined>()

  const handleLogin = () => {
    if(!email || !password) {
      setError('Email and password are required')
      return
    }
    setTimeout(() => {
      const user = db.find(u => u.email === email && u.password === password)
      if(!user) {
        setError('Invalid email or password')
        return
      }
      navigation.navigate('HomePage')
    }, 1000 )
  }
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Welcome to <Text>World Explorer</Text></Text>
        <Text style={styles.header}>Log In</Text>
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <View style={styles.signUpContainer}>
          <Text>Don't have an account? </Text>
          <Pressable onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUp}>Sign up</Text>
          </Pressable>
        </View>
        <Button title="Submit" onPress={handleLogin} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 12,
  },
  title:{
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 150,
    marginTop: -100,
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
  },
  input: {
    marginBottom: 12,
    width: '90%',
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  signUp: {
    fontWeight: 'bold',
    color: '#5b8cfe'
  },
  error:{
    color: 'red',
  }
});

export default Logincreen