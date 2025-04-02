import React from 'react';
import {View, StyleSheet, TextStyle, TextInput, Pressable} from 'react-native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {GoogleMicSvg, GoogleSvg} from '../../../assets/svg';
import {colors} from '../../../utils/colors';
import {deviceWidth, fontFamily} from '../../../utils/styles';
import {MaterialIcons} from '../../../utils/icons';
import CropTool from '../croptool/CropTool';
import { useNavigation } from '@react-navigation/native';
import { navigationKey } from '../../../utils/navigation';

const CroppedImage = ({
  capturedImage,
  translateY,
  showTextBox,

}: {
  capturedImage: string;
  translateY: {value: number};
  showTextBox: {value: number};

}) => {
  const {mainContainer, googleStuffView, textInputStyle, iconStyle, textStyle,image,searchBarImage} =
    styles;


    const navigation = useNavigation()

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(translateY.value),
    };
  });

  const animateGoogleStuff = useAnimatedStyle(() => {
    return {
      opacity: withTiming(showTextBox.value),
    };
  });

  return (
    <>
      <Animated.View style={[mainContainer, animatedStyle]}>
        <Animated.Image
          source={{uri: `file://${capturedImage}`}}
          style={[ image]}
          />
          <CropTool 
          />
      </Animated.View>

      <Animated.View style={[googleStuffView, animateGoogleStuff]}>
        <View style={{marginTop: 25}}>
          <GoogleSvg width={100} height={100} />
        </View>
        <Animated.View style={[textInputStyle, animateGoogleStuff]}>
          <View style={iconStyle}>
            <MaterialIcons name="search" size={25} />

            <Animated.Image
                source={{uri: `file://${capturedImage}`}}
                style={[searchBarImage]}
            />

            <TextInput
              placeholder="Add to your search"
              style={textStyle}
              placeholderTextColor={colors.black}
            />
          </View>
          <Pressable onPress={()=>navigation.navigate(navigationKey.SPEECH)}>
             <GoogleMicSvg />
          </Pressable>
        </Animated.View>
      </Animated.View>
    </>
  );
};

export default CroppedImage;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#222',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    width:'100%',
    display:'flex',
    alignItems:'center',
  },
  googleStuffView: {
    borderColor: '#222',
    position: 'absolute',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBarImage:{width:50,height:30,marginLeft:3,borderRadius:5},
  iconStyle: {flexDirection: 'row', alignItems: 'center'},
  textInputStyle: {
    height: 50,
    width: '95%',
    flexDirection: 'row',
    borderRadius: 25,
    backgroundColor: colors.searchBarColor,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    bottom: 20,
  },
  textStyle: {
    fontFamily: fontFamily.ProductSansMedium,
    marginLeft: 5,
  },
  container: {
    flex: 1,
    borderWidth: 5,
    borderColor: '#222',
    zIndex: 111111,
    backgroundColor: 'red',
  },
  viewShot: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  image: {width: '100%',borderBottomLeftRadius:20,borderBottomRightRadius:20, height: '100%', resizeMode: 'contain'},
  cropBox: {
    position: 'absolute',
    borderColor: 'red',
    borderWidth: 2,
  },
});
