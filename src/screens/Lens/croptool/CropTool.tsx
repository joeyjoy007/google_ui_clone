import React, {useCallback, useContext} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
  BounceIn,
  withTiming
} from 'react-native-reanimated';
import {colors} from '../../../utils/colors';
import ImageEditor from '@react-native-community/image-editor';
import {cropToolDimensions} from '../../../utils/appData';
import {CroptoolContext} from '../../../context/CropToolContext';
import {deviceWidth} from '../../../utils/styles';
import {useFocusEffect} from '@react-navigation/native';

const CropTool = ({capturedImage}:{capturedImage:string}) => {
  const [imageRealWidth, setImageRealWidth] = React.useState(1000);
  const [imageRealHeight, setImageRealHeight] = React.useState(1000);
  const [imageUri, setImageUri] = React.useState('');

  const {
    boxX,
    boxY,
    boxWidth,
    boxHeight,
    setResizedImageUri,
    isSecondViewScrolling,
    setSetstoredXValue,
    yValueSet,
    storedXWidth,
    setStoredXWidth,
    storedYHeight,
    setStoredYHeight,
    animatedImageHeight,
    animatedImageWidth
  }: any = useContext(CroptoolContext);

  const offsetX = useSharedValue(boxX.value);
  const offsetY = useSharedValue(boxY.value);
  const offsetWidth = useSharedValue(boxWidth.value);
  const offsetHeight = useSharedValue(boxHeight.value);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      offsetX.value = boxX.value;
      offsetY.value = boxY.value;
    })
    .onUpdate(event => {
      boxX.value = Math.max(
        0,
        Math.min(
          offsetX.value + event.translationX,
          deviceWidth - boxWidth.value,
        ),
      );
      boxY.value = Math.max(
        0,
        Math.min(
          offsetY.value + event.translationY,
          cropToolDimensions.MAX_HEIGHT - boxHeight.value,
        ),
      );
    })
    .onEnd(() => {
      offsetX.value = boxX.value;
      offsetY.value = boxY.value;

      ('worklet');
      runOnJS(yValueSet)(boxY.value);
      ('worklet');
      runOnJS(setSetstoredXValue)(boxX.value);
      ('worklet');
      runOnJS(setStoredXWidth)(boxWidth.value);
      ('worklet');
      runOnJS(setStoredYHeight)(boxHeight.value);
    });

  const resizeGesture = Gesture.Pan()
    .onStart(() => {
      offsetWidth.value = boxWidth.value;
      offsetHeight.value = boxHeight.value;
    })
    .onUpdate(event => {
      let newWidth = Math.max(
        cropToolDimensions.MIN_WIDTH,
        Math.min(
          offsetWidth.value + event.translationX,
          cropToolDimensions.MAX_WIDTH - boxX.value,
        ),
      );
      let newHeight = Math.max(
        cropToolDimensions.MIN_HEIGHT,
        Math.min(
          offsetHeight.value + event.translationY,
          cropToolDimensions.MAX_HEIGHT - boxY.value,
        ),
      );

      boxWidth.value = newWidth;
      boxHeight.value = newHeight;
    })
    .onEnd(() => {
      'worklet';
      runOnJS(yValueSet)(boxY.value);
      ('worklet');
      runOnJS(setSetstoredXValue)(boxX.value);
      ('worklet');
      runOnJS(setStoredXWidth)(boxWidth.value);
      ('worklet');
      runOnJS(setStoredYHeight)(boxHeight.value);
    });

  const resizeTopLeftGesture = Gesture.Pan()
    .onStart(() => {
      offsetX.value = boxX.value;
      offsetY.value = boxY.value;
      offsetWidth.value = boxWidth.value;
      offsetHeight.value = boxHeight.value;
    })
    .onUpdate(event => {
      const newX = offsetX.value + event.translationX;
      const newY = offsetY.value + event.translationY;
      const newWidth = offsetWidth.value - event.translationX;
      const newHeight = offsetHeight.value - event.translationY;

      if (newWidth >= cropToolDimensions.MIN_WIDTH && newX >= 0) {
        boxX.value = newX;
        boxWidth.value = newWidth;
      }
      if (newHeight >= cropToolDimensions.MIN_HEIGHT && newY >= 0) {
        boxY.value = newY;
        boxHeight.value = newHeight;
      }
    })
    .onEnd(() => {
      'worklet';
      runOnJS(yValueSet)(boxY.value);
      ('worklet');
      runOnJS(setSetstoredXValue)(boxX.value);
      ('worklet');
      runOnJS(setStoredXWidth)(boxWidth.value);
      ('worklet');
      runOnJS(setStoredYHeight)(boxHeight.value);
    });

  const resizeTopRightGesture = Gesture.Pan()
    .onStart(() => {
      offsetY.value = boxY.value;
      offsetWidth.value = boxWidth.value;
      offsetHeight.value = boxHeight.value;
    })
    .onUpdate(event => {
      const newY = offsetY.value + event.translationY;
      const newWidth = offsetWidth.value + event.translationX;
      const newHeight = offsetHeight.value - event.translationY;

      if (newWidth >= cropToolDimensions.MIN_WIDTH) {
        boxWidth.value = newWidth;
      }
      if (newHeight >= cropToolDimensions.MIN_HEIGHT && newY >= 0) {
        boxY.value = newY;
        boxHeight.value = newHeight;
      }
    })
    .onEnd(() => {
      'worklet';
      runOnJS(yValueSet)(boxY.value);
      ('worklet');
      runOnJS(setSetstoredXValue)(boxX.value);
      ('worklet');
      runOnJS(setStoredXWidth)(boxWidth.value);
      ('worklet');
      runOnJS(setStoredYHeight)(boxHeight.value);
    });

  const resizeBottomLeftGesture = Gesture.Pan()
    .onStart(() => {
      offsetX.value = boxX.value;
      offsetWidth.value = boxWidth.value;
      offsetHeight.value = boxHeight.value;
    })
    .onUpdate(event => {
      const newX = offsetX.value + event.translationX;
      const newWidth = offsetWidth.value - event.translationX;
      const newHeight = offsetHeight.value + event.translationY;

      if (newWidth >= cropToolDimensions.MIN_WIDTH && newX >= 0) {
        boxX.value = newX;
        boxWidth.value = newWidth;
      }
      if (newHeight >= cropToolDimensions.MIN_HEIGHT) {
        boxHeight.value = newHeight;
      }
    })
    .onEnd(() => {
      'worklet';
      runOnJS(yValueSet)(boxY.value);
      ('worklet');
      runOnJS(setSetstoredXValue)(boxX.value);
      ('worklet');
      runOnJS(setStoredXWidth)(boxWidth.value);
      ('worklet');
      runOnJS(setStoredYHeight)(boxHeight.value);
    });

  const animatedBoxStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    width: boxWidth.value,
    height: boxHeight.value,
    left: boxX.value,
    top: boxY.value,
  }));

  const getImageDimensions = (imageUri: string) => {
    Image.getSize(
      imageUri,
      (width, height) => {
        setImageRealHeight(height);
        setImageRealWidth(width);
      },
      error => {
        setImageRealHeight(800);
        setImageRealWidth(800);
      },
    );
  };

  useFocusEffect(
    useCallback(() => {
      getImageDimensions(capturedImage);
      return () => {
        boxX.value = (deviceWidth - cropToolDimensions.INITIAL_WIDTH) / 2;
        boxY.value =
          (cropToolDimensions.MAX_HEIGHT - cropToolDimensions.INITIAL_HEIGHT) /
          2;
        boxWidth.value = cropToolDimensions.INITIAL_WIDTH;
        boxHeight.value = cropToolDimensions.INITIAL_HEIGHT;
        setResizedImageUri('');
        setSetstoredXValue(
          (deviceWidth - cropToolDimensions.INITIAL_WIDTH) / 2,
        );
        yValueSet(
          (cropToolDimensions.MAX_HEIGHT - cropToolDimensions.INITIAL_HEIGHT) /
            2,
        );
        setStoredYHeight(cropToolDimensions.INITIAL_HEIGHT);
        setStoredXWidth(cropToolDimensions.INITIAL_WIDTH);
      };
    }, [capturedImage]),
  );

  const cropImage = async () => {
    try {
      const xValue = boxX.value * (imageRealWidth / deviceWidth);
      const yValue =
        boxY.value * (imageRealHeight / cropToolDimensions.MAX_HEIGHT);
      const widthValue = boxWidth.value * (imageRealWidth / deviceWidth);
      const heightValue =
        boxHeight.value * (imageRealHeight / cropToolDimensions.MAX_HEIGHT);
      const cropData = {
        offset: {x: xValue, y: yValue},
        size: {width: widthValue, height: heightValue},
        resizeMode: 'contain',
        format: 'png',
      };

      const uri = await ImageEditor.cropImage(capturedImage, cropData);
      setImageUri(uri.uri);
      setResizedImageUri(uri.uri);
    } catch (error) {}
  };

  React.useEffect(() => {
    if (isSecondViewScrolling) {
      cropImage();
    }
    return () => {};
  }, [isSecondViewScrolling]);

  const animatedBoxStyle2 = useAnimatedStyle(()=>{
    return {
      width:animatedImageWidth.value,
      height:animatedImageHeight.value
    }
  })

  return (
    <>
      <Animated.View style={[StyleSheet.absoluteFill]}>
        <Animated.View style={[StyleSheet.absoluteFill]}>
          <Animated.View
            style={[
              useAnimatedStyle(() => ({
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: boxY.value,
                backgroundColor: isSecondViewScrolling
                  ? colors.transparent
                  : colors.overLayBlack,
              })),
            ]}
          />

          <Animated.View
            style={[
              useAnimatedStyle(() => ({
                position: 'absolute',
                top: boxY.value + boxHeight.value,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: isSecondViewScrolling
                  ? colors.transparent
                  : colors.overLayBlack,
              })),
            ]}
          />

          <Animated.View
            style={[
              useAnimatedStyle(() => ({
                position: 'absolute',
                top: boxY.value,
                left: 0,
                width: boxX.value,
                height: boxHeight.value,
                backgroundColor: isSecondViewScrolling
                  ? colors.transparent
                  : colors.overLayBlack,
              })),
            ]}
          />

          <Animated.View
            style={[
              useAnimatedStyle(() => ({
                position: 'absolute',
                top: boxY.value,
                left: boxX.value + boxWidth.value,
                right: 0,
                height: boxHeight.value,
                backgroundColor: isSecondViewScrolling
                  ? colors.transparent
                  : colors.overLayBlack,
              })),
            ]}
          />
        </Animated.View>

        <GestureDetector gesture={panGesture}>
          <Animated.View
            entering={BounceIn}
            style={[styles.focusBox, animatedBoxStyle]}>
            {isSecondViewScrolling && (
              <Animated.Image
                source={{uri: imageUri}}
                style={[{
                
                  borderRadius: 15,
                  zIndex: 999999999999,
                  position: 'absolute',
                  resizeMode:'contain'
                },animatedBoxStyle2]}
              />
            )}
            {!isSecondViewScrolling && (
              <>
                <GestureDetector gesture={resizeGesture}>
                  <View
                    style={[styles.resizeHandle, styles.cornerBottomRight]}
                  />
                </GestureDetector>
                <GestureDetector gesture={resizeTopLeftGesture}>
                  <View style={[styles.resizeHandle, styles.cornerTopLeft]} />
                </GestureDetector>
                <GestureDetector gesture={resizeTopRightGesture}>
                  <View style={[styles.resizeHandle, styles.cornerTopRight]} />
                </GestureDetector>
                <GestureDetector gesture={resizeBottomLeftGesture}>
                  <View
                    style={[styles.resizeHandle, styles.cornerBottomLeft]}
                  />
                </GestureDetector>
              </>
            )}
          </Animated.View>
        </GestureDetector>
      </Animated.View>
    </>
  );
};

export default CropTool;

const defaultBorderWidth = -4;

const styles = StyleSheet.create({
  focusBox: {
    backgroundColor: colors.transparent,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  resizeHandle: {
    width: 25,
    height: 25,
    position: 'absolute',
  },
  cornerBottomRight: {
    bottom: defaultBorderWidth,
    right: defaultBorderWidth,
    borderRightWidth: -defaultBorderWidth,
    borderBottomWidth: -defaultBorderWidth,
    borderBottomRightRadius: 15,
    borderColor: colors.white,
  },
  cornerTopLeft: {
    top: defaultBorderWidth,
    left: defaultBorderWidth,
    borderLeftWidth: -defaultBorderWidth,
    borderTopWidth: -defaultBorderWidth,
    borderTopLeftRadius: 15,
    borderColor: colors.white,
  },
  cornerTopRight: {
    top: defaultBorderWidth,
    right: defaultBorderWidth,
    borderRightWidth: -defaultBorderWidth,
    borderTopWidth: -defaultBorderWidth,
    borderTopRightRadius: 15,
    borderColor: colors.white,
  },
  cornerBottomLeft: {
    bottom: defaultBorderWidth,
    left: defaultBorderWidth,
    borderLeftWidth: -defaultBorderWidth,
    borderBottomWidth: -defaultBorderWidth,
    borderBottomLeftRadius: 15,
    borderColor: colors.white,
  },
});
