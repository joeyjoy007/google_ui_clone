import React, {useEffect, useRef, useState, useCallback} from 'react';
import {View, Text, StyleSheet, StatusBar, Image} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {RESULTS} from 'react-native-permissions';
import LensHeader from './Header';
import FocusCorners from './FocusCorners';
import BottomContainer from './BottomContainer';
import LensFooter from './LensFooter';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import CroppedImage from './croppedImage/CroppedImage';

const GoogleLensUI = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null)
  const [separateImage, setSeparateImage] = useState('')

  const devices = useCameraDevices();
  const cameraRef = useRef(null);
  const device = devices?.[0];

  const {bottomParentContainerStyle} = styles
  const bottomHeightFlex = useSharedValue(0.09);
  const footerOpacity = useSharedValue(1);

  const animatedBottomStyle = useAnimatedStyle(()=>{
    return {
      flex: withTiming(bottomHeightFlex.value,{duration:300}),
    }
  })
  const footerStyle = useAnimatedStyle(()=>{
    return {
      opacity: withTiming(footerOpacity.value,{duration:300}),
    }
  })

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);

      return () => {
        StatusBar.setBarStyle('dark-content');
        StatusBar.setBackgroundColor('#fff');
        StatusBar.setTranslucent(false);
        setCapturedImage(null)
        bottomHeightFlex.value = 0.09; 
        footerOpacity.value = 1; 
      };
    }, []),
  );

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === RESULTS.GRANTED);
    })();
  }, []);

  if (!hasPermission) return <Text>Camera permission is required</Text>;
  if (!device) return <Text>No Camera Available</Text>;

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePhoto();
      setCapturedImage(photo.path); 
      bottomHeightFlex.value = .6;
      footerOpacity.value = 0;
    }
  };

 
  

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>

      {capturedImage ? (
       
         <CroppedImage 
        setSeparateImage={setSeparateImage}
        capturedImage={capturedImage}/>
      ) : (
       <>
         <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />     
      
      <FocusCorners />
     <LensFooter
      takePicuture={takePicture}
      />
       </>
      )}
      <LensHeader 
        capturedImage={capturedImage}
      />
     
       
      </View>

      <Animated.View style={[styles.bottomParentContainerStyle, animatedBottomStyle]}>
        <BottomContainer 
        separateImage={separateImage}
        capturedImage={capturedImage} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  bottomParentContainerStyle: {
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
  },
});

export default GoogleLensUI;
