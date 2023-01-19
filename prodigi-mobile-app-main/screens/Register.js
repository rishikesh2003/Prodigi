import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
} from 'react-native';
import {supabase} from '../config/client';

const Register = ({navigation}) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  async function handleSignUp() {
    setLoading(true);
    try {
      if (!name || !email || !password) {
        Alert.alert('Please fill all the required fields!');
      } else {
        const {error} = await supabase.auth.signUp({
          email: email,
          password: password,
          options: {
            data: {
              name: name,
            },
          },
        });
        if (error) {
          throw new Error(error.message);
        }
      }
    } catch (error) {
      Alert.alert(error.message);
    }

    await setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Image
          style={styles.image}
          source={require('../assets/register.png')}
        />
        <Text style={styles.header}>Register</Text>
        <TextInput
          value={name}
          onChangeText={text => setName(text)}
          textContentType={'name'}
          style={styles.input}
          placeholder="Name*"
          placeholderTextColor={'black'}
        />
        <TextInput
          value={email}
          onChangeText={text => {
            setEmail(text);
          }}
          textContentType={'emailAddress'}
          style={styles.input}
          placeholder="Email Address*"
          placeholderTextColor={'black'}
        />
        <TextInput
          value={password}
          onChangeText={text => setPassword(text)}
          textContentType={'password'}
          style={styles.input}
          placeholderTextColor={'black'}
          placeholder="Password*"
        />
        <TouchableOpacity
          disabled={loading}
          onPress={handleSignUp}
          style={styles.button}>
          <Text style={styles.buttonText}>
            {loading ? 'Loading...' : 'REGISTER'}
          </Text>
        </TouchableOpacity>
        <Text
          onPress={() => {
            navigation.navigate('Login');
          }}
          style={styles.text}>
          Already have an account? Login
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 20,
    width: Dimensions.get('window').width,
  },
  header: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },
  input: {
    color: 'black',
    height: 55,
    width: Dimensions.get('window').width / 1.1,
    marginVertical: 15,
    borderWidth: 1,
    padding: 15,
    borderRadius: 15,
  },
  button: {
    backgroundColor: '#61a557',
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: Dimensions.get('window').width / 1.1,
    marginVertical: 15,
    borderRadius: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  image: {
    height: Dimensions.get('window').height / 3,
    width: Dimensions.get('window').width / 1.1,
  },
});

export default Register;
