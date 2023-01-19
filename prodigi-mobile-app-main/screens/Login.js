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

const Login = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const handleLogin = async () => {
    setLoading(true);
    try {
      if (!email || !password) {
        Alert.alert('Invalid Input', 'Please fill the required fields');
      } else {
        const {error} = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
        if (error) {
          throw new Error(error.message);
        }
      }
    } catch (error) {
      Alert.alert(error.message);
    }
    await setLoading(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Image style={styles.image} source={require('../assets/login.png')} />
        <Text style={styles.header}>Login</Text>
        <TextInput
          value={email}
          textContentType={'emailAddress'}
          style={styles.input}
          placeholder="Email Address*"
          placeholderTextColor={'black'}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          value={password}
          textContentType={'password'}
          secureTextEntry={true}
          style={styles.input}
          placeholderTextColor={'black'}
          placeholder="Password*"
          onChangeText={text => setPassword(text)}
        />
        <Text style={styles.text}>Forgot Password?</Text>
        <TouchableOpacity
          disabled={loading}
          onPress={handleLogin}
          style={styles.button}>
          <Text style={styles.buttonText}>
            {loading ? 'Loading...' : 'LOGIN'}
          </Text>
        </TouchableOpacity>
        <Text
          onPress={() => {
            navigation.navigate('Register');
          }}
          style={styles.text}>
          Don't have an account? Register
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

export default Login;
