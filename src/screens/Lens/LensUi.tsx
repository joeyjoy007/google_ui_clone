import React, {useState, useCallback, useRef, useContext} from 'react';
import {View, StyleSheet, StatusBar, Text} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import {useFocusEffect} from '@react-navigation/native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

import {deviceHeight, deviceWidth} from '../../utils/styles';
import {RESULTS} from 'react-native-permissions';
import FocusCorners from './FocusCorners';
import LensFooter from './LensFooter';
import LensHeader from './Header';
import BottomContainer from './BottomContainer';
import CroppedImage from './croppedImage/CroppedImage';
import {CroptoolContext} from '../../context/CropToolContext';
import {cropToolDimensions} from '../../utils/appData';

const GoogleLensUI = () => {
  const {
    imageScale,
    boxX,
    boxY,
    boxWidth,
    boxHeight,
    setIsSecondViewScrolling,
    storedXValue,
    yStored,
    storedYHeight,
    storedXWidth,
  }: any = useContext(CroptoolContext);

  const [expanded, setExpanded] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const MAX_DRAG = 200;

  const devices = useCameraDevices();
  const cameraRef = useRef(null);
  const device = devices?.[0];

  const flexFirst = useSharedValue(0.9);
  const flexSecond = useSharedValue(0.1);
  const offsetY = useSharedValue(0);
  const startY = useSharedValue(0);
  const bottomContainerOpacity = useSharedValue(1);
  const bottomContainerTopBar = useSharedValue(0);
  const showGoogleStuff = useSharedValue(0);
  const croppedImageTranslateY = useSharedValue(1);

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
        offsetY.value = 0;
        startY.value = 0;
        bottomContainerOpacity.value = 1;
        bottomContainerTopBar.value = 0;
        showGoogleStuff.value = 0;
        croppedImageTranslateY.value = 1;
        imageScale.value = 1;
        boxX.value = (deviceWidth - cropToolDimensions.INITIAL_WIDTH) / 2;
        boxY.value =
          (cropToolDimensions.MAX_HEIGHT - cropToolDimensions.INITIAL_HEIGHT) /
          2;
        boxWidth.value = cropToolDimensions.INITIAL_WIDTH;
        boxHeight.value = cropToolDimensions.INITIAL_HEIGHT;
        setIsSecondViewScrolling(false);

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

  const expandView = () => {
    if (!expanded) {
      flexFirst.value = withTiming(0.6, {duration: 300});
      flexSecond.value = withTiming(0.4, {duration: 300});
    } else {
      flexFirst.value = withTiming(0.9, {duration: 300});
      flexSecond.value = withTiming(0.1, {duration: 300});
    }
    setExpanded(!expanded);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePhoto();
      setCapturedImage(photo.path);
      expandView();
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
      let newOffset =
        (startY.value == 0 ? MAX_DRAG : startY.value) + translationY;

      // Restrict newOffset to stay within bounds [-MAX_DRAG, MAX_DRAG]
      newOffset = Math.max(Math.min(newOffset, MAX_DRAG), -MAX_DRAG);

      if (expanded) {
        flexFirst.value = interpolate(
          newOffset,
          [-MAX_DRAG, 0, MAX_DRAG],
          [0.15, 0.6, 0.9],
          Extrapolation.CLAMP,
        );

        flexSecond.value = interpolate(
          newOffset,
          [-MAX_DRAG, MAX_DRAG],
          [0.85, 0.6],
          Extrapolation.CLAMP,
        );
        boxX.value = interpolate(
          flexSecond.value,
          [0.6, 0.8],
          [storedXValue, 50],
          Extrapolation.CLAMP,
        );
        boxY.value = interpolate(
          flexSecond.value,
          [0.6, 0.8],
          [yStored, 77.5],
          Extrapolation.CLAMP,
        );

        boxWidth.value = interpolate(
          flexSecond.value,
          [0.6, 0.8],
          [storedXWidth, 70],
          Extrapolation.CLAMP,
        );
        boxHeight.value = interpolate(
          flexSecond.value,
          [0.6, 0.8],
          [storedYHeight, 70],
          Extrapolation.CLAMP,
        );
        imageScale.value = interpolate(
          flexSecond.value,
          [0.6, 0.85],
          [1, .1],
          Extrapolation.CLAMP,
        );

        bottomContainerOpacity.value = interpolate(
          newOffset,
          [-MAX_DRAG, 0, MAX_DRAG],
          [0, 0.5, 1],
        );
        croppedImageTranslateY.value = interpolate(
          flexSecond.value,
          [0.6, 0.65,.7, 0.85],
          [1, 0.5,0.2, 0],
        );
        showGoogleStuff.value = interpolate(
          flexSecond.value,
          [0.8, 0.85],
          [0, 1],
        );

        bottomContainerTopBar.value = interpolate(
          newOffset,
          [-MAX_DRAG, 0, MAX_DRAG],
          [1, 0.5, 0],
        );

        if (flexSecond.value > 0.6) {
          ('worklet');
          runOnJS(setIsSecondViewScrolling)(true);
        } else {
          ('worklet');
          runOnJS(setIsSecondViewScrolling)(false);
        }
      }
    })
    .onFinalize(event => {
      const newOffset = startY.value + event.translationY;

      offsetY.value = Math.max(Math.min(newOffset, MAX_DRAG), -MAX_DRAG);

      if (offsetY.value <= -MAX_DRAG) {
        ('worklet');
        runOnJS(setScrollEnabled)(true);
      } else {
        ('worklet');
        runOnJS(setScrollEnabled)(false);
      }
    });

  const searchListAnimation = e => {
    const scrollY = e.nativeEvent.contentOffset.y;

    if (scrollY <= 5 && scrollEnabled) {
      runOnJS(setScrollEnabled)(false);
    }

    if (scrollY > 5 && !scrollEnabled) {
      runOnJS(setScrollEnabled)(true);
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
        {/* Camera permission is required */}
      </Text>
    );
  if (!device) return '';
  // <Text>No Camera Available</Text>;
  return (
    <View style={styles.container}>
      {/* First View with Button */}
      <Animated.View style={[firstViewStyle]}>
        {capturedImage ? (
          <>
            <CroppedImage
              translateY={croppedImageTranslateY}
              showTextBox={showGoogleStuff}
              capturedImage={capturedImage}
            />
            <LensHeader
              translateY={croppedImageTranslateY}
              capturedImage={capturedImage}
            />
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
              takePicuture={takePicture}
            />
            <LensHeader
              translateY={{value: 1}}
              capturedImage={capturedImage || ''}
            />
          </>
        )}
      </Animated.View>

      {/* Second View */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[secondViewStyle]}>
          <View style={{flex: 1}}>
            <BottomContainer
              capturedImage={capturedImage || ''}
              scrollEnabled={scrollEnabled}
              searchListAnimation={searchListAnimation}
              opacity={bottomContainerOpacity}
              scale={bottomContainerOpacity}
              topBar={bottomContainerTopBar}
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
