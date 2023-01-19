import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {useIsFocused} from '@react-navigation/native';

import {
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  View,
} from 'react-native';
import {useCameraDevices} from 'react-native-vision-camera';
import {Camera} from 'react-native-vision-camera';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';

function QR({navigation}) {
  const [hasPermission, setHasPermission] = React.useState(false);
  const devices = useCameraDevices();
  const device = devices.back;

  const isFocused = useIsFocused();

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });
  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, [isFocused]);

  async function handleScan() {
    await AsyncStorage.setItem('BUILDING_INFO', barcodes[0].displayValue);
    await navigation.navigate('Home');
  }

  return (
    device != null &&
    hasPermission && (
      <>
        <View style={styles.container}>
          <Camera
            style={styles.camera}
            device={device}
            isActive={true}
            frameProcessor={frameProcessor}
          />

          {barcodes[0] ? (
            <>
              <Text style={styles.barcodeTextURL}>
                The Scanned QR code is {'\n'}
                {'\n'}
                <Text style={styles.barCodeContent}>
                  {barcodes[0]?.displayValue}
                </Text>
              </Text>

              <TouchableOpacity onPress={handleScan} style={styles.button}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.barcodeTextURL}>Scan the QR Code</Text>
          )}
        </View>
      </>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    height: 200,
    width: 200,
  },
  barcodeTextURL: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
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
  barCodeContent: {
    color: 'black',
    fontWeight: 'normal',
    fontSize: 16,
  },
});

export default QR;
