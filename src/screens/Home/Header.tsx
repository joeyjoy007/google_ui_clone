import {  Image, Pressable, StyleSheet, View } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import React, { useContext, useRef } from 'react'
import { BottomSheetContext } from '../../context/BottomSheetContext.tsx';
import { myProfile } from '../../assets/images/index.ts';

const Header = () => {
   const {headerContainer,profileIcon} = styles
   const {bottomSheetRef} = useContext(BottomSheetContext)
   
   const openSheet = ()=>{
    console.log("first,bott",bottomSheetRef.current)
     bottomSheetRef.current.snapToIndex(1)

   }
  return (
    <View style={headerContainer}>
      <MaterialCommunityIcons name="flask" size={30} color="black" />
      <Pressable onPress={openSheet}>
        <Image
        source={myProfile}
        style={profileIcon}
        />
      </Pressable>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  headerContainer: {justifyContent:'space-between',display:'flex',flexDirection:'row',flex:1},
  profileIcon:{height:30,width:30,borderRadius:100}

})