import {
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../../utils/colors';
import {fontFamily} from '../../utils/styles';
import {MaterialIcons} from '../../utils/icons';
import {launchImageLibrary} from 'react-native-image-picker';

const LensFooter = ({
  takePicuture,
  setCapturedImage,
  expandView,
}: {
  takePicuture: () => void;
  setCapturedImage: (uri: string) => void;
  expandView:()=>void
}) => {
  const {bottomBar,parentGallary,childGallary,photoBackgroundButton,photoForeGroundButton,extraViewButton} = styles;

  const openGallary = async () => {
    try {
      const options = {
        mediaType: 'photo' as const,
        quality: 1,
      };

      launchImageLibrary(options, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorMessage) {
        } else if (response.assets && response.assets.length > 0) {
          if (response.assets[0].uri) {
            setCapturedImage(response.assets[0].uri);
            expandView();
          } else {
            console.error('Image URI is undefined');
          }
        }
      });
    } catch (error) {
      setCapturedImage(null);
      console.log('Error occured in opening gallary');
    }
  };
  return (
    <View style={bottomBar}>
      <View
        style={parentGallary}>
        <TouchableOpacity
          onPress={openGallary}
          style={childGallary}></TouchableOpacity>
      </View>

      <View
        style={photoBackgroundButton}>
        <Pressable
          onPress={takePicuture}
          style={photoForeGroundButton}>
          <View style={{position: 'absolute'}}>
            <MaterialIcons name="search" color={colors.black} size={30} />
          </View>
          <View>
            <View
              style={extraViewButton}
            />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default LensFooter;

const styles = StyleSheet.create({
  parentGallary:{
    width: 50,
    bottom: 16,
    borderColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    height: 50,
    left: 50,
  },
  childGallary:{
    width: 40,
    top: 9,
    borderColor: colors.white,
    borderBottomLeftRadius: 10,
    borderWidth: 1,
    height: 45,
    right: 6,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  photoBackgroundButton:{
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    width: '100%',
    borderColor: '#fff',
    alignItems: 'center',
  },
  photoForeGroundButton:{
    height: 70,
    width: 70,
    borderRadius: 100,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  extraViewButton:{
    height: 82,
    width: 82,
    borderRadius: 100,
    backgroundColor: colors.white,
    opacity: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: 25,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontFamily: fontFamily.ProductSansMedium,
  },
  icon: {color: 'white', fontSize: 20},
});
