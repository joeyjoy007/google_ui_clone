import React, {useState, useCallback, useRef} from 'react';
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
  const [checkScrollingdisabled, setCheckScrollingdisabled] = useState(false)
  const [hasPermission, setHasPermission] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);


  const MAX_DRAG = deviceHeight*.35; 

  const devices = useCameraDevices();
  const cameraRef = useRef(null);
  const device = devices?.[0];

  const flexFirst = useSharedValue(0.9);
  const flexSecond = useSharedValue(0.1);
  const offsetY = useSharedValue(0); // Stores last known position
  const startY = useSharedValue(0);
  const bottomContainerOpacity = useSharedValue(1);
  const bottomContainerScale = useSharedValue(1);

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
        offsetY.value = 0; // Stores last known position
        offsetY.value = 0;
        bottomContainerOpacity.value =1
        bottomContainerScale.value =1
        setExpanded(false);
        setScrollEnabled(false);
        setCapturedImage(null);
      };
    }, []),
  );

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === RESULTS.GRANTED);
    })();
  }, []);

  const expandView = ()=>{
    if (!expanded) {
      flexFirst.value = withTiming(0.6, {duration: 300});
      flexSecond.value = withTiming(0.4, {duration: 300});
      
    } else {
      flexFirst.value = withTiming(0.9, {duration: 300});
      flexSecond.value = withTiming(0.1, {duration: 300});
    
    }
    setExpanded(!expanded);
  }
  
  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePhoto();
      setCapturedImage(photo.path);
      expandView()
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
      startY.value = offsetY.value;
    })
    .onChange(event => {
      const translationY = event.translationY;
      let newOffset = startY.value + translationY;

  // Restrict newOffset to stay within bounds [-MAX_DRAG, MAX_DRAG]
  newOffset = Math.max(Math.min(newOffset, MAX_DRAG), -MAX_DRAG);
      
      if (expanded) {
        flexFirst.value = interpolate(
          newOffset,
          [-MAX_DRAG, 0, MAX_DRAG], // Input range (scroll up to scroll down)
          [0.15, 0.6, 0.9], // Output range for flexFirst
          Extrapolation.CLAMP, // Ensures values stay within range
        );

        flexSecond.value = interpolate(
          newOffset,
          [-MAX_DRAG, 0, MAX_DRAG], // Input range (scroll up to scroll down)
          [0.85, 0.6, 0.4],
          Extrapolation.CLAMP, // Ensures values stay within range
        );

        bottomContainerOpacity.value = interpolate(
          newOffset,
          [MAX_DRAG, 0, -MAX_DRAG], // Input range (scroll up to scroll down)
          [1, 0.5, 0],
          Extrapolation.CLAMP, // Ensures values stay within range
        );
      }
    })
    .onFinalize(event => {
      const newOffset = startY.value + event.translationY;
    
      // Clamp the new offset between MAX_DRAG and -MAX_DRAG
      offsetY.value = Math.max(Math.min(newOffset, MAX_DRAG), -MAX_DRAG);
    
      // if(flexSecond.value <.85){

      // }
      // When the offset is greater than or equal to -MAX_DRAG, enable scrolling
      if (offsetY.value <= -MAX_DRAG) {
        'worklet';
          runOnJS(setScrollEnabled)(true);
        
      } else {
        'worklet';
        console.log("IN HERE");
        runOnJS(setScrollEnabled)(false);


      }
    });
    
    // Adjusting the search list animation to use the offset logic
    const searchListAnimation = e => {
    
      const scrollY = e.nativeEvent.contentOffset.y;
    
      // Only disable scroll when the user reaches the top (within threshold)
      if (scrollY <= 5 && scrollEnabled) {
        runOnJS(setScrollEnabled)(false);
        console.log("Scrolling disabled at top");
      }
    
      // Re-enable scroll when user scrolls down again
      if (scrollY > 5 && !scrollEnabled) {
        runOnJS(setScrollEnabled)(true);
        console.log("Scrolling enabled");
      }
    };
    
  if (!hasPermission)
    return (
      <Text
        style={{
          textAlign: 'center',
          width: '100%',
          flex: 1,
          marginTop: deviceHeight / 2,
        }}>
        Camera permission is required
      </Text>
    );
  if (!device) return <Text>No Camera Available</Text>;
  return (
    <View style={styles.container}>
      {/* First View with Button */}
      <Animated.View style={[firstViewStyle]}>
        {capturedImage ? (
          <>
            <CroppedImage capturedImage={capturedImage} />
            <LensHeader capturedImage={capturedImage} />
          </>
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
            setCapturedImage={setCapturedImage}
            expandView={expandView}
            takePicuture={takePicture} />
            <LensHeader capturedImage={capturedImage} />
          </>
        )}
      </Animated.View>

      {/* Second View */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[secondViewStyle]}>
          <View style={{flex: 1}}>
           
            <BottomContainer
              capturedImage={capturedImage}
              scrollEnabled={scrollEnabled}
              searchListAnimation={searchListAnimation}
              opacity={bottomContainerOpacity.value}
              scale={bottomContainerScale.value}
            />
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
