import {useState} from 'react'
import { View, Text, TextInput, Button, StyleSheet, Pressable } from 'react-native'
import db from '../../mock-db/db.json'

const SignUpScreen = ({navigation}: {navigation: any}) => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | undefined>()

  const handleSignUp = () => {
    if(!name || !email || !password || !confirmPassword) {
      setError('All fields are required')
      return
    }
    if(password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    const user = db.find(u => u.email === email)
    if(user) {
      setError('Email already in use')
      return
    }
    db.push({ id: db.length + 1, name, email, password, favoriteCodes: [] })
    setTimeout(() => {
      navigation.navigate('HomePage')
    }, 1000 )
  }
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Welcome to <Text>World Explorer</Text></Text>
        <Text style={styles.header}>Sign Up</Text>
        <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
        <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <View style={styles.signUpContainer}>
          <Text>Don't have an account? </Text>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signUp}>Log in</Text>
          </Pressable>
        </View>
        <Button title="Submit" onPress={handleSignUp} />
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

export default SignUpScreen