import React, { useCallback, useRef } from "react";
import { View, StyleSheet, Dimensions, Button, TouchableOpacity, Image } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle } from "react-native-reanimated";
import ViewShot, { captureRef } from "react-native-view-shot";
import { colors } from "../../../utils/colors";
import ImageEditor from "@react-native-community/image-editor";
import { getActionFromState, useFocusEffect } from "@react-navigation/native";
import { deviceHeight, deviceWidth } from "../../../utils/styles";

const { width, height } = Dimensions.get("window");

const MIN_WIDTH = 100;
const MIN_HEIGHT = 100;
const MAX_WIDTH = width - 50;
const MAX_HEIGHT = height / 1.6;
const INITIAL_WIDTH = 200;
const INITIAL_HEIGHT = 250;

const CropTool = ({capturedImage}) => {
  const [imageRealWidth, setImageRealWidth] = React.useState(1000)
  const [imageRealHeight, setImageRealHeight] = React.useState(1000)

  // Shared values for position and size
  const boxX = useSharedValue((width - INITIAL_WIDTH) / 2);
  const boxY = useSharedValue((MAX_HEIGHT - INITIAL_HEIGHT) / 2);
  const boxWidth = useSharedValue(INITIAL_WIDTH);
  const boxHeight = useSharedValue(INITIAL_HEIGHT);


  const offsetX = useSharedValue(boxX.value);
  const offsetY = useSharedValue(boxY.value);
  const offsetWidth = useSharedValue(boxWidth.value);
  const offsetHeight = useSharedValue(boxHeight.value);


  const panGesture = Gesture.Pan()
    .onStart(() => {
      offsetX.value = boxX.value;
      offsetY.value = boxY.value;
    })
    .onUpdate((event) => {
      boxX.value = Math.max(0, Math.min(offsetX.value + event.translationX, width - boxWidth.value));
      boxY.value = Math.max(0, Math.min(offsetY.value + event.translationY, MAX_HEIGHT - boxHeight.value));
    })
    .onEnd(() => {
      offsetX.value = boxX.value;
      offsetY.value = boxY.value;
    });


    const resizeGesture = Gesture.Pan()
    .onStart(() => {
      offsetWidth.value = boxWidth.value;
      offsetHeight.value = boxHeight.value;
    })
    .onUpdate((event) => {
      let newWidth = Math.max(MIN_WIDTH, Math.min(offsetWidth.value + event.translationX, MAX_WIDTH - boxX.value));
      let newHeight = Math.max(MIN_HEIGHT, Math.min(offsetHeight.value + event.translationY, MAX_HEIGHT - boxY.value));

      boxWidth.value = newWidth;
      boxHeight.value = newHeight;
    });

  // Animated styles
  const animatedBoxStyle = useAnimatedStyle(() => ({
    position: "absolute",
    width: boxWidth.value,
    height: boxHeight.value,
    left: boxX.value,
    top: boxY.value,
  }));

  const getImageDimensions = (imageUri:string) => {
    Image.getSize(imageUri, (width, height) => {
      console.log(
        "DSS",width,height
      )
      setImageRealHeight(height)
      setImageRealWidth(width)
    }, (error) => {
      console.error("Failed to get image size: ", error);
      setImageRealHeight(800)
      setImageRealWidth(800)
    
    });
  };
 

  useFocusEffect(
      useCallback(() => {
       getImageDimensions(capturedImage)
  
        return () => {
          
        };
      }, [capturedImage]),
    );
  

  

  const cropImage = async () => {
    try {
      const cropData = {
        offset: { x:imageRealWidth>1100? boxX.value*6:boxX.value, y:imageRealHeight>1100?boxY.value*6: boxY.value},
        size: { width: imageRealWidth, height: imageRealHeight },
        resizeMode:'contain',
        format:'png'
      };

      const uri = await ImageEditor.cropImage(capturedImage, cropData);
      console.log("Cropped Image URI: ", uri);
      // setimageURI(uri.uri);
    } catch (error) {
      console.error("Image cropping failed: ", error);
    }
  };

  return (
    <>
      <View style={[StyleSheet.absoluteFill,{backgroundColor:colors.lightBlack} ]}>
        {/* Move Gesture */}
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.focusBox, animatedBoxStyle]}>

                 
            <GestureDetector gesture={resizeGesture}>
              <View style={[styles.resizeHandle, styles.cornerBottomRight]} />
            </GestureDetector>
          </Animated.View>
        </GestureDetector>
        
      </View>
    </>
  );
};

export default CropTool;


const styles = StyleSheet.create({
  focusBox: {
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  resizeHandle: {
    width: 40,
    height: 40,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 20,
  },
  cornerBottomRight: {
    bottom: -20,
    right: -20,
  },
});
