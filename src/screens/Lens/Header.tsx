import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import React from 'react';
import {colors} from '../../utils/colors';
import {fontFamily} from '../../utils/styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import { MaterialCommunityIcons, MaterialIcons } from '../../utils/icons';

const LensHeader = ({capturedImage}: {capturedImage: string}) => {
  const insets = useSafeAreaInsets();
  const {topBar, title, iconRow} = styles;
  const navigation = useNavigation();

  return (
    <View style={[topBar, {top: 15 + insets.top}]}>
      <View style={iconRow}>
        <TouchableOpacity
          style={{zIndex: 99999999}}
          onPress={() => navigation.goBack()}>
          {capturedImage ? (
            <MaterialIcons name="arrow-back" color={colors.white} size={25} />
          ) : (
            <MaterialCommunityIcons
              name="close"
              size={24}
              color={colors.white}
            />
          )}
        </TouchableOpacity>
        {!capturedImage && (
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="flash-off"
              size={24}
              color={colors.white}
            />
          </TouchableOpacity>
        )}
      </View>
      <Text style={title}>Google Lens</Text>
      <View style={iconRow}>
        {!capturedImage && (
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="history"
              size={24}
              color={colors.white}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            color={colors.white}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LensHeader;

const styles = StyleSheet.create({
  topBar: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontFamily: fontFamily.ProductSansMedium,
  },
  iconRow: {flexDirection: 'row', gap: 15},
  icon: {color: 'white', fontSize: 20},
});
