import React, { useRef, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from 'react-native-reanimated';
import ViewShot from 'react-native-view-shot';
import ImageEditor from "@react-native-community/image-editor";
import { deviceWidth } from '../../../utils/styles';

const CroppedImage = ({ capturedImage, setSeparateImage,animatedBannerStyle }: { capturedImage: string; onCropped: (uri: string) => void }) => {
  const viewShotRef = useRef<ViewShot>(null);
  const lastCaptureTime = useRef<number>(0);

  // Shared values for dragging & scaling
  const translateX = useSharedValue(50);
  const translateY = useSharedValue(50);
  const width = useSharedValue(200);
  const height = useSharedValue(200);
  const needsCapture = useSharedValue(false);
  const lastTranslateX = useSharedValue(0);
  const lastTranslateY = useSharedValue(0);
  const throttleTimeout = useRef(null); // Prevents frequent updates
  
  const panGesture = Gesture.Pan()
    .onStart(() => {
      lastTranslateX.value = translateX.value;
      lastTranslateY.value = translateY.value;
    })
    .onUpdate((event) => {
      // Scale down the movement speed (0.3 reduces speed)
      const newX = lastTranslateX.value + event.translationX*1 ;
      const newY = lastTranslateY.value + event.translationY*1;
  
      // Apply smooth transition
      translateX.value = withSpring(newX, { damping: 20, stiffness: 150 });
      translateY.value = withSpring(newY, { damping: 20, stiffness: 150 });
  
      needsCapture.value = true
    
    });
  

  // Resizable Gesture with Throttling
  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      const newWidth = Math.max(100, Math.min(300, width.value * event.scale)); // Min-Max constraints
      const newHeight = Math.max(100, Math.min(300, height.value * event.scale));

      width.value = withSpring(newWidth, { damping: 20, stiffness: 150 }); // Smooth scaling
      height.value = withSpring(newHeight, { damping: 20, stiffness: 150 });

      needsCapture.value = true; // Mark for capture
    });

  // **Throttled capture function (No lodash)**
  const captureCroppedImage = async () => {
    const now = Date.now();
    if (now - lastCaptureTime.current < 1000) return; // Limit to 1 capture per second

    lastCaptureTime.current = now;
    
    if (viewShotRef.current) {
      const uri = await viewShotRef.current.capture();
      const cropData = {
        offset: { x: translateX.value, y: translateY.value },
        size: { width: width.value, height: height.value },
      };
      console.log("CROP",cropData)

      const croppedUri = await ImageEditor.cropImage(uri, cropData);
      setSeparateImage(croppedUri)

      // console.log("URIS",croppedUri)
    //   runOnJS(onCropped)(uri);
    }
  };

  // Effect to listen for capture changes (Runs every 500ms)
  useEffect(() => {
    const interval = setInterval(() => {
      if (needsCapture.value) {
        captureCroppedImage();
        needsCapture.value = false;
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  // Animated crop box styles
  const cropBoxStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    width: width.value,
    height: height.value,
  }));

  return (
    
   <View style={{backgroundColor:'#222',borderBottomLeftRadius:20,borderBottomRightRadius:20}}> 
     <Animated.Image source={{ uri: `file://${capturedImage}` }} style={[animatedBannerStyle,styles.image]} />
   </View>

    

 
  );
};

export default CroppedImage;

const styles = StyleSheet.create({
  container: { flex: 1 ,borderWidth:5,borderColor:'#222',zIndex:111111,backgroundColor:'red'},
  viewShot: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  image: { width: 400, height: '100%', resizeMode: 'contain' },
  cropBox: {
    position: 'absolute',
    borderColor: 'red',
    borderWidth: 2,
    // backgroundColor: 'rgba(255, 0, 0, 0.2)',
  },
});
