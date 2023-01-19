import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import WiFiRTT from '../../components/WiFiRTT';

const Home = () => {
  const isFocused = useIsFocused();
  const [BUILDING_INFO, setBUILDING_INFO] = React.useState('');
  const [progress, setProgress] = React.useState();
  React.useEffect(() => {
    (async () => {
      setProgress();
      const value = await AsyncStorage.getItem('BUILDING_INFO');
      setBUILDING_INFO(value);
      setProgress(
        <AnimatedCircularProgress
          size={200}
          width={15}
          fill={100}
          tintColor="#61a557"
          backgroundColor="#000000">
          {() => <Text style={styles.header}>100</Text>}
        </AnimatedCircularProgress>,
      );
    })();
  }, [isFocused]);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Home</Text>
      <View style={styles.progressCointainer}>{progress}</View>
      <View style={[styles.card]}>
        <View>
          <Text style={styles.subHeader}>Current Building</Text>
          <Text style={styles.barCodeContent}>
            {BUILDING_INFO ? BUILDING_INFO : ''}
          </Text>
        </View>
        <Image
          style={styles.img}
          source={require('../../assets/building-icon.png')}
        />
      </View>
      <WiFiRTT isFocused={isFocused} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  progressCointainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
  },
  barCodeContent: {
    color: 'black',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 25,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 45,
    paddingHorizontal: 25,
    width: '100%',
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subHeader: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  img: {
    width: 96,
    height: 96,
  },
});

export default Home;
