import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {supabase} from '../../config/client';
import {useIsFocused} from '@react-navigation/native';

const Profile = () => {
  const [user, setUser] = React.useState();
  const isFocused = useIsFocused();
  React.useEffect(() => {
    async function getUser() {
      const {
        data: {user},
      } = await supabase.auth.getUser();
      await setUser(user);
    }
    getUser();
  }, [isFocused]);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <Image
        style={styles.image}
        source={require('../../assets/profile.png')}
      />
      {user && user ? (
        <>
          <Text style={styles.text}>Name : {user.user_metadata.name}</Text>
          <Text style={styles.text}>Email : {user.email}</Text>
          <TouchableOpacity
            onPress={() => {
              supabase.auth.signOut();
            }}
            style={styles.button}>
            <Text style={styles.buttonText}>LOGOUT</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text>{''}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
  },
  header: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: 'black',
    margin: 20,
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
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  image: {
    height: Dimensions.get('window').height / 3,
    width: Dimensions.get('window').width / 1.1,
  },
});

export default Profile;
