import React, {useState, useCallback, useRef, use} from 'react';
import {
  View,
  Button,
  StyleSheet,
  StatusBar,
  Dimensions,
  Text,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import {useFocusEffect} from '@react-navigation/native';
import {
  Gesture,
  GestureDetector,
  ScrollView,
} from 'react-native-gesture-handler';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

import {deviceHeight} from '../../utils/styles';
import {RESULTS} from 'react-native-permissions';
import FocusCorners from './FocusCorners';
import LensFooter from './LensFooter';
import LensHeader from './Header';
import BottomContainer from './BottomContainer';
import CroppedImage from './croppedImage/CroppedImage';

const {height, width} = Dimensions.get('window');

const GoogleLensUI = () => {
  const [expanded, setExpanded] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const devices = useCameraDevices();
  const cameraRef = useRef(null);
  const device = devices?.[0];

  const flexFirst = useSharedValue(0.9);
  const flexSecond = useSharedValue(0.1);
  const offsetY = useSharedValue(0); // Stores last known position
const startY = useSharedValue(0);
  

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);

      return () => {
        StatusBar.setBarStyle('dark-content');
        StatusBar.setBackgroundColor('#fff');
        StatusBar.setTranslucent(false);
        flexFirst.value = 0.9;
        flexSecond.value = 0.1;
        offsetY.value =0 // Stores last known position
        offsetY.value =0;
        setExpanded(false);
        setScrollEnabled(false);
        setCapturedImage(null)
      };
    }, []),
  );

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === RESULTS.GRANTED);
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePhoto();
      setCapturedImage(photo.path);
      if (!expanded) {
        flexFirst.value = withTiming(0.6, {duration: 300});
        flexSecond.value = withTiming(0.4, {duration: 300});
      } else {
        flexFirst.value = withTiming(0.9, {duration: 300});
        flexSecond.value = withTiming(0.1, {duration: 300});
      }
      setExpanded(!expanded);
    }
  };


  const firstViewStyle = useAnimatedStyle(() => ({
    flex: flexFirst.value,
    justifyContent: 'center',
    alignItems: 'center',
  }));

  const secondViewStyle = useAnimatedStyle(() => ({
    flex: flexSecond.value,
  }));

  const panGesture = Gesture.Pan()
    .onBegin(event => {
      console.log('EVENT start', event);
      startY.value = offsetY.value;
      
    })
    .onChange(event => {
      const translationY = event.translationY;
      const newOffset = startY.value + translationY;
      // if(expanded){
         flexFirst.value = interpolate(
      newOffset,
      [-200, 0, 200], // Input range (scroll up to scroll down)
      [0.15, 0.6, 0.9], // Output range for flexFirst
      Extrapolation.CLAMP // Ensures values stay within range
    );

    flexSecond.value = interpolate(
      newOffset,
      [-200, 0, 200],
      [0.85, 0.4, 0.1],
      Extrapolation.CLAMP // Ensures values stay within range
    );
      // }
   
      

    })
    .onFinalize(event => {
      if (expanded && event.translationY < -20) {
        flexFirst.value = withTiming(0.15, {duration: 300});
        flexSecond.value = withTiming(0.85, {duration: 300});
        ('worklet');
        runOnJS(setScrollEnabled)(true);
      } else if (expanded && event.translationY > 20) {
        flexFirst.value = withTiming(0.6, {duration: 300});
        flexSecond.value = withTiming(0.4, {duration: 300});
       
      }
        offsetY.value = startY.value + event.translationY;
    });



  const searchListAnimation = (e)=>{
    console.log("SSs",e)
    e.nativeEvent.contentOffset.y < 30 && setScrollEnabled(false)

  }
  if (!hasPermission) return <Text>Camera permission is required</Text>;
  if (!device) return <Text>No Camera Available</Text>;
  return (
    <View style={styles.container}>
      {/* First View with Button */}
      <Animated.View style={[firstViewStyle]}>
        {
           capturedImage?
         <>
           <CroppedImage 
          capturedImage={capturedImage}/>
          <LensHeader capturedImage={capturedImage} /> 
         </>

          :
          <>
            <Camera
              ref={cameraRef}
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={true}
              photo={true}
            />
            <FocusCorners />
            <LensFooter takePicuture={takePicture} />
            <LensHeader capturedImage={capturedImage} /> 

          </>
        }
      </Animated.View>

      {/* Second View */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[secondViewStyle]}>
          <View style={{flex:1}}>
            {/* <ScrollView
             nestedScrollEnabled={true}
             keyboardShouldPersistTaps={true}
              onScroll={e =>
                e.nativeEvent.contentOffset.y < 10 && setScrollEnabled(false)
              }
              scrollEnabled={scrollEnabled}> */}
               <BottomContainer
                  capturedImage={capturedImage}
                  scrollEnabled={scrollEnabled}
                  setScrolledEnabled={setScrollEnabled}
                  searchListAnimation={searchListAnimation}
              />
            {/* </ScrollView> */}
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default GoogleLensUI;
