import React, { useCallback, useContext, } from "react";
import { View, StyleSheet, Dimensions, Image, TouchableOpacity,  } from "react-native";
import { Gesture, GestureDetector, } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, runOnJS } from "react-native-reanimated";
import { colors } from "../../../utils/colors";
import ImageEditor from "@react-native-community/image-editor";
import { cropToolDimensions } from "../../../utils/appData";
import { CroptoolContext } from "../../../context/CropToolContext";
import { deviceWidth } from "../../../utils/styles";
import { useFocusEffect } from "@react-navigation/native";



const CropTool = ({capturedImage,colorAnimationStyle}) => {
  const [imageRealWidth, setImageRealWidth] = React.useState(1000)
  const [imageRealHeight, setImageRealHeight] = React.useState(1000)
  const [imageUri, setImageUri] = React.useState('')

  const {boxX,boxY,boxWidth,boxHeight,setIsSecondViewScrolling,setResizedImageUri,resizedImageUri,imageScale,isSecondViewScrolling,setSetstoredXValue,yValueSet}:any = useContext(CroptoolContext)    



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
      boxX.value = Math.max(0, Math.min(offsetX.value + event.translationX, deviceWidth - boxWidth.value));
      boxY.value = Math.max(0, Math.min(offsetY.value + event.translationY, cropToolDimensions.MAX_HEIGHT - boxHeight.value));
    })
    .onEnd(() => {
      offsetX.value = boxX.value;
      offsetY.value = boxY.value;

      'worklet'
      runOnJS(yValueSet)(boxY.value)
      'worklet'
      runOnJS(setSetstoredXValue)(boxX.value)
    });


    const resizeGesture = Gesture.Pan()
    .onStart(() => {
      offsetWidth.value = boxWidth.value;
      offsetHeight.value = boxHeight.value;
    })
    .onUpdate((event) => {
      let newWidth = Math.max(cropToolDimensions.MIN_WIDTH, Math.min(offsetWidth.value + event.translationX, cropToolDimensions.MAX_WIDTH - boxX.value));
      let newHeight = Math.max(cropToolDimensions.MIN_HEIGHT, Math.min(offsetHeight.value + event.translationY, cropToolDimensions.MAX_HEIGHT- boxY.value));

      boxWidth.value = newWidth;
      boxHeight.value = newHeight;

      console.log("SAu",boxY.value,boxY.value)

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

  const scalingImageStyle = useAnimatedStyle(()=>{
    return{
      transform:[{scale:imageScale.value}],
    }
  })
 
     

  
 

  useFocusEffect(
      useCallback(() => {
          getImageDimensions(capturedImage)
        return () => {
        boxX.value = (deviceWidth - cropToolDimensions.INITIAL_WIDTH) / 2
        boxY.value = (cropToolDimensions.MAX_HEIGHT - cropToolDimensions.INITIAL_HEIGHT) / 2
        boxWidth.value = cropToolDimensions.INITIAL_WIDTH
        boxHeight.value = cropToolDimensions.INITIAL_HEIGHT

        };
      }, [capturedImage]),
    );
  

  

  const cropImage = async () => {
    try {
      const xValue = boxX.value * (imageRealWidth / (deviceWidth));
      const yValue = boxY.value * (imageRealHeight / cropToolDimensions.MAX_HEIGHT); 
      const widthValue = boxWidth.value * (imageRealWidth /( deviceWidth));
      const heightValue = boxHeight.value * (imageRealHeight / cropToolDimensions.MAX_HEIGHT);
      const cropData = {
        offset: { x:xValue,y:yValue},
        size: { width: widthValue, height: heightValue },
        resizeMode:'contain',
        format:'png'
      };

      const uri = await ImageEditor.cropImage(capturedImage, cropData);
      console.log("Cropped Image URI: ", uri);
      setImageUri(uri.uri);
      setResizedImageUri(uri.uri)
    } catch (error) {
      console.error("Image cropping failed: ", error);
    }
  };

  React.useEffect(() => {
    if(isSecondViewScrolling){
      cropImage()
    }
    return () => {
    }
  }, [isSecondViewScrolling])

  return (
    <>
      <Animated.View style={[StyleSheet.absoluteFill,colorAnimationStyle ]}>
        {/* Move Gesture */}
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.focusBox, animatedBoxStyle,scalingImageStyle]}>
            {
              isSecondViewScrolling&& <Image source={{uri:imageUri}} style={{width:boxWidth.value,height:boxHeight.value,borderRadius:25}}/>
            }
            <GestureDetector gesture={resizeGesture}>
              <View style={[styles.resizeHandle, styles.cornerBottomRight]} />
            </GestureDetector>
          </Animated.View>
        </GestureDetector>

        {/* <TouchableOpacity onPress={cropImage} style={{height:40,backgroundColor:'red',bottom:0,position:'absolute',width:'100%'}}>
          <Image source={{uri:imageUri}} style={{width:200,height:200,resizeMode:'contain'}}/>
        </TouchableOpacity> */}
        
      </Animated.View>
    </>
  );
};

export default CropTool;


const styles = StyleSheet.create({
  focusBox: {
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderWidth:.5,
    borderColor:colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  resizeHandle: {
    width: 40,
    height: 40,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 20,
    borderWidth:2,
    borderColor:colors.white
  },
  cornerBottomRight: {
    bottom: -20,
    right: -20,
  },
});
