import { StyleSheet, Text, TextInput, View } from 'react-native'
import SearchIcon from 'react-native-vector-icons/MaterialIcons';
import React from 'react'
import { GoogleLensSvg, GoogleMicSvg } from '../../assets/svg';
import QuickFeed from './QuickFeed';
import { fontFamily } from '../../utils/styles';
import { colors } from '../../utils/colors';

const SearchBar = () => {
  const {mainContainer,searchIcon,googleAsset} = styles
  return (
    <View style={mainContainer}>
      <SearchIcon name='search' style={searchIcon} size={30}/>
      <TextInput
      placeholder='Search'
      placeholderTextColor={colors.grey}
      style={{fontSize:22,fontFamily:fontFamily.ProductSansRegular}}
      />
      <View style={googleAsset}>
        <GoogleMicSvg />
        <GoogleLensSvg />
      </View>
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  mainContainer:{height:65,backgroundColor:'#E8EAED',borderRadius:100,marginTop:10,justifyContent:'center',paddingLeft:45},
  searchIcon:{position:'absolute',bottom:17,left:15,color:'grey'},
  googleAsset:{position:'absolute',flexDirection:'row',alignItems:'center',right:15,gap:10}
})