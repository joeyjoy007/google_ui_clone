import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import {colors} from '../../utils/colors';
import {deviceWidth, fontFamily} from '../../utils/styles';

const LensFooter = () => {
  const {bottomBar, title, icon,} = styles;
  return (
    <View style={bottomBar}>
        <TouchableOpacity style={{width:40,bottom:16,borderColor:colors.white,borderRadius:10,borderWidth:1,height:40,left:50}} >

        </TouchableOpacity>

        <View style={{position:'absolute',bottom:0,justifyContent:'center',width:'100%',borderColor:'#fff',alignItems:'center'}}>
        <Pressable
        style={{
          height: 70,
          width: 70,
          borderRadius: 100,
          backgroundColor: colors.white,
          alignItems: 'center',
          justifyContent: 'center',
        
          
        }}>
        <View style={{position: 'absolute'}}>
          <MaterialIcons name="search" color={colors.black} size={30} />
        </View>
        <View
          style={{
            height: 82,
            width: 82,
            borderRadius: 100,
            backgroundColor: colors.white,
            opacity: 0.2,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      </Pressable>
        </View>
      </View>
   
  );
};

export default LensFooter;

const styles = StyleSheet.create({
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
