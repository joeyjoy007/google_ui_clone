import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { RESULTS } from 'react-native-permissions';
import LensHeader from './Header';
import FocusCorners from './FocusCorners';
import BottomContainer from './BottomContainer';
import LensFooter from './LensFooter';

const GoogleLensUI = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const cameraRef = useRef(null);
  const device = devices?.[0];

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);

      return () => {
        StatusBar.setBarStyle('dark-content');
        StatusBar.setBackgroundColor('#fff');
        StatusBar.setTranslucent(false);
      };
    }, [])
  );

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === RESULTS.GRANTED);
    })();
  }, []);

  if (!hasPermission) return <Text>Camera permission is required</Text>;
  if (!device) return <Text>No Camera Available</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <Camera ref={cameraRef} style={StyleSheet.absoluteFill} device={device} isActive={true} photo={true} />
        <LensHeader />
        <FocusCorners />
        <LensFooter />
      </View>

      <View style={styles.bottomParentContainerStyle}>
        <BottomContainer/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 ,},
  bottomParentContainerStyle: {
    flex: 0.09,
    borderColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
  },
  upperContainer: {
    flex: 1,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderWidth: 1,
    overflow: 'hidden',
    borderColor: '#fff',
    backgroundColor: '#222',
  }
});

export default GoogleLensUI;
