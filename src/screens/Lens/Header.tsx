import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import React from 'react';
import {colors} from '../../utils/colors';
import {fontFamily} from '../../utils/styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const LensHeader = () => {
  const insets = useSafeAreaInsets();
  const {topBar, title, iconRow} = styles;
  const navigation = useNavigation()
  return (
    <View style={[topBar,{top:15+insets.top}]}>
      <View style={iconRow}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <MaterialCommunityIcons name="close" size={24} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="flash-off"
            size={24}
            color={colors.white}
          />
        </TouchableOpacity>
      </View>
      <Text style={title}>Google Lens</Text>
      <View style={iconRow}>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="history"
            size={24}
            color={colors.white}
          />
        </TouchableOpacity>
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
