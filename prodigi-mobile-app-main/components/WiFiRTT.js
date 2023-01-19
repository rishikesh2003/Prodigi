import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import WiFi from 'react-native-wifi-reborn';

function WiFiRTT(props) {
  const [location, setLocation] = React.useState('');
  const [wifiList, setWifiList] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    })();
  }, [props.isFocused]);

  React.useEffect(() => {
    const getLocation = async () => {
      console.log('Scanning for WiFi Networks...');
      WiFi.reScanAndLoadWifiList().then(wifiList => {
        // let str = '';
        setWifiList(wifiList);
        // wifiList.forEach(wifi => {
        //   str += wifi.SSID.toString() + ' ' + wifi.level.toString() + '\n';
        // });
        // Alert.alert(str);
      });
    };
    setInterval(getLocation, 3000);
  }, []);

  if (wifiList.length != 0) {
    let index = 0;
    let min = wifiList[0].level;
    wifiList.forEach((wifi, idx) => {
      if (wifi.level > min) {
        min = wifi.level;
        index = idx;
      }
    });
    let wifi = wifiList[index];
    console.log(wifi);

    if (wifi.SSID === 'FROSTY 3492') {
      if (location !== 'Study Room') {
        setLocation('Study Room');
      }
      // const data = {
      //   power: 'true',
      // };
      // fetch(
      //   'https://db6f-2402-3a80-133c-5a97-282a-3c85-b3e5-d1b1.in.ngrok.io/power',
      //   {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(data),
      //   },
      // )
      //   .then(response => console.log(response))
      //   .then(data => {
      //     console.log('Success:', data);
      //   })
      //   .catch(error => {
      //     console.error('Error:', error);
      //   });
    } else if (wifi.SSID === 'Sri' && location !== 'Hall') {
      setLocation('Hall');
      // const data = {
      //   power: 'false',
      // };
      // fetch(
      //   'https://db6f-2402-3a80-133c-5a97-282a-3c85-b3e5-d1b1.in.ngrok.io/power',
      //   {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(data),
      //   },
      // )
      //   .then(response => console.log(response))
      //   .then(data => {
      //     console.log('Success:', data);
      //   })
      //   .catch(error => {
      //     console.error('Error:', error);
      //   });
    } else if (wifi.SSID === 'xyz' && location !== 'Kitchen') {
      setLocation('Kitchen');
      // const data = {
      //   power: 'false',
      // };
      // fetch(
      //   'https://db6f-2402-3a80-133c-5a97-282a-3c85-b3e5-d1b1.in.ngrok.io/power',
      //   {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(data),
      //   },
      // )
      //   .then(response => console.log(response))
      //   .then(data => {
      //     console.log('Success:', data);
      //   })
      //   .catch(error => {
      //     console.error('Error:', error);
      //   });
    } else {
      // const data = {
      //   power: 'false',
      // };
      // fetch(
      //   'https://db6f-2402-3a80-133c-5a97-282a-3c85-b3e5-d1b1.in.ngrok.io/power',
      //   {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(data),
      //   },
      // )
      //   .then(response => console.log(response))
      //   .then(data => {
      //     console.log('Success:', data);
      //   })
      //   .catch(error => {
      //     console.error('Error:', error);
      //   });
    }
  }

  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.subHeader}>Current Location</Text>
        <Text style={styles.barCodeContent}>{location ? location : ''}</Text>
      </View>
      <Image
        style={styles.img}
        source={require('../assets/location-icon.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
  barCodeContent: {
    color: 'black',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 25,
  },
});

export default WiFiRTT;
