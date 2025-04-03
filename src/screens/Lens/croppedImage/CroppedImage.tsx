import React, {useCallback, useContext} from 'react';
import {View, StyleSheet, TextInput, Pressable, Image} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {GoogleMicSvg, GoogleSvg} from '../../../assets/svg';
import {colors} from '../../../utils/colors';
import {deviceWidth, fontFamily} from '../../../utils/styles';
import {MaterialIcons} from '../../../utils/icons';
import CropTool from '../croptool/CropTool';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {navigationKey} from '../../../utils/navigation';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import {CroptoolContext} from '../../../context/CropToolContext';

const CroppedImage = ({
  capturedImage,
  translateY,
  showTextBox,
}: {
  capturedImage: string;
  translateY: {value: number};
  showTextBox: {value: number};
}) => {
  const {
    mainContainer,
    googleStuffView,
    textInputStyle,
    iconStyle,
    textStyle,
    image,
    searchBarImage,
  } = styles;

  const {resizedImageUri} = useContext(CroptoolContext);

  const [resizedImage, setResizedImage] = React.useState('');

  const navigation = useNavigation();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(translateY.value),
    };
  });

  const colorAnimationStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      translateY.value,
      [1, 0],
      [colors.lightBlack, colors.transparent],
    );
    return {backgroundColor};
  });

  const animateGoogleStuff = useAnimatedStyle(() => {
    return {
      opacity: withTiming(showTextBox.value),
    };
  });

  const resizeImage = async (imageUri: string) => {
    try {
      const maxWidth = deviceWidth;
      const maxHeight = 800;

      const {width: originalWidth, height: originalHeight} = await new Promise(
        (resolve, reject) => {
          Image.getSize(
            imageUri,
            (width, height) => resolve({width, height}),
            reject,
          );
        },
      );

      let newWidth = originalWidth;
      let newHeight = originalHeight;

      const aspectRatio = originalWidth / originalHeight;

      if (newWidth > maxWidth) {
        newWidth = maxWidth;
        newHeight = Math.round(newWidth / aspectRatio);
      }
      if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = Math.round(newHeight * aspectRatio);
      }

      const resizedImage = await ImageResizer.createResizedImage(
        imageUri,
        newWidth,
        newHeight,
        'JPEG',
        100,
        0,
        undefined,
        false,
        {mode: 'contain', onlyScaleDown: true},
      );

      setResizedImage(resizedImage.uri);
    } catch (error) {}
  };

  useFocusEffect(
    useCallback(() => {
      resizeImage(`file://${capturedImage}`);
      return () => {};
    }, [capturedImage]),
  );

  return (
    <>
      <Animated.View style={[mainContainer, animatedStyle]}>
        <Animated.Image source={{uri: resizedImage}} style={[image]} />
      </Animated.View>
      <CropTool
        capturedImage={resizedImage}
        colorAnimationStyle={colorAnimationStyle}
      />

      <Animated.View style={[googleStuffView, animateGoogleStuff]}>
        <View style={{marginTop: 25}}>
          <GoogleSvg width={100} height={100} />
        </View>
        <Animated.View style={[textInputStyle, animateGoogleStuff]}>
          <View style={iconStyle}>
            <MaterialIcons name="search" size={25} />

            <Animated.Image
              source={{uri: resizedImageUri || `file://${capturedImage}`}}
              style={[searchBarImage]}
            />

            <TextInput
              placeholder="Add to your search"
              style={textStyle}
              editable={false}
              placeholderTextColor={colors.black}
            />
          </View>
          <Pressable onPress={() => navigation.navigate(navigationKey.SPEECH)}>
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
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  googleStuffView: {
    borderColor: '#222',
    position: 'absolute',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBarImage: {width: 50, height: 30, marginLeft: 3, borderRadius: 5},
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
  image: {
    width: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: '100%',
    resizeMode: 'contain',
  },
  cropBox: {
    position: 'absolute',
    borderColor: 'red',
    borderWidth: 2,
  },
});
