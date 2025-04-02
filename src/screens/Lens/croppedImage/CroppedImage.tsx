import React from 'react';
import { View, StyleSheet, TextStyle, TextInput } from 'react-native';
import Animated, { Extrapolation, interpolate, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { GoogleLogo, GoogleMicSvg, GoogleSvg } from '../../../assets/svg';
import { colors } from '../../../utils/colors';
import { fontFamily } from '../../../utils/styles';
import { MaterialIcons } from '../../../utils/icons';


const CroppedImage = ({ capturedImage, animatedBannerStyle,translateY,showTextBox }: { capturedImage: string; animatedBannerStyle: TextStyle,translateY:{value:number},showTextBox:{value:number} }) => {

  const animatedStyle = useAnimatedStyle(()=>{
    return {
      opacity:withTiming(translateY.value),
    }
  })

  const animateGoogleStuff = useAnimatedStyle(()=>{
    return {
      opacity:withTiming(showTextBox.value),
    }
  })
  
  return (
    
   <>
    <Animated.View style={[{backgroundColor:'#222',borderBottomLeftRadius:20,borderBottomRightRadius:20},animatedStyle]}> 
     <Animated.Image source={{ uri: `file://${capturedImage}` }} style={[animatedBannerStyle,styles.image]} />
   </Animated.View>

   <Animated.View style={[{borderColor:'#222',position:'absolute',marginTop:20,alignItems:'center',justifyContent:'center',},animateGoogleStuff]}>
       <View style={{marginTop:15}}>
        <GoogleSvg width={100} height={100}/>
       </View>
       <Animated.View
                  style={[{
                    height: 50,
                    width:'95%',
                    flexDirection: 'row',
                    borderRadius: 25,
                    backgroundColor: colors.searchBarColor,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                    bottom:20,
                  },animateGoogleStuff]}>
                  <View style={{flexDirection: 'row',alignItems:'center'}}>
                          <MaterialIcons name="search" style={{}} size={25} />
                    
                    <TextInput
                      placeholder="Add to your search"
                      style={{
                        fontFamily: fontFamily.ProductSansMedium,
                        marginLeft: 5,
                      }}
                      placeholderTextColor={colors.black}
                    />
                  </View>
                  <GoogleMicSvg/>
                </Animated.View>
   </Animated.View>
   </>

    

 
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
  },
});
