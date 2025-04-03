import React, {useCallback, useContext} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
  BounceIn,
} from 'react-native-reanimated';
import {colors} from '../../../utils/colors';
import ImageEditor from '@react-native-community/image-editor';
import {cropToolDimensions} from '../../../utils/appData';
import {CroptoolContext} from '../../../context/CropToolContext';
import {deviceWidth} from '../../../utils/styles';
import {useFocusEffect} from '@react-navigation/native';

const CropTool = ({capturedImage, colorAnimationStyle}) => {
  const [imageRealWidth, setImageRealWidth] = React.useState(1000);
  const [imageRealHeight, setImageRealHeight] = React.useState(1000);
  const [imageUri, setImageUri] = React.useState('');

  const {
    boxX,
    boxY,
    boxWidth,
    boxHeight,
    setResizedImageUri,
    imageScale,
    isSecondViewScrolling,
    setSetstoredXValue,
    yValueSet,
    storedXWidth,
    setStoredXWidth,
    storedYHeight,
    setStoredYHeight,
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

  const scalingImageStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: imageScale.value}],
    };
  });

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
        imageScale.value = 1;
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

  return (
    <>
      <Animated.View style={[StyleSheet.absoluteFill, colorAnimationStyle]}>
        <GestureDetector gesture={panGesture}>
          <Animated.View
            entering={BounceIn}
            style={[styles.focusBox, animatedBoxStyle, scalingImageStyle]}>
            {isSecondViewScrolling && (
              <Image
                source={{uri: imageUri}}
                style={{
                  width: storedXWidth,
                  height: storedYHeight,
                  borderRadius: 25,
                }}
              />
            )}
            {!isSecondViewScrolling && (
              <GestureDetector gesture={resizeGesture}>
                <View style={[styles.resizeHandle, styles.cornerBottomRight]} />
              </GestureDetector>
            )}
          </Animated.View>
        </GestureDetector>
      </Animated.View>
    </>
  );
};

export default CropTool;

const styles = StyleSheet.create({
  focusBox: {
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderWidth: 0.5,
    borderColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resizeHandle: {
    width: 40,
    height: 40,
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.white,
  },
  cornerBottomRight: {
    bottom: -20,
    right: -20,
  },
});
