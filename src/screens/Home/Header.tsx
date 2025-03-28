import { StyleSheet, Text, View } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import React from 'react'

const Header = () => {
  const {headerContainer,profileIcon} = styles
  return (
    <View style={headerContainer}>
      <MaterialCommunityIcons name="flask" size={30} color="black" />
      <View style={profileIcon}/>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  headerContainer: {justifyContent:'space-between',display:'flex',flexDirection:'row'},
  profileIcon:{height:30,width:30,borderRadius:100,borderWidth:1}

})