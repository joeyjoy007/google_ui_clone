import { StyleSheet, Text, TextInput, View } from 'react-native'
import SearchIcon from 'react-native-vector-icons/MaterialIcons';
import React from 'react'
import { GoogleLensSvg, GoogleMicSvg } from '../../assets/svg';
import QuickFeed from './QuickFeed';

const SearchBar = () => {
  return (
    <View style={{height:65,backgroundColor:'#E8EAED',borderRadius:100,marginTop:10,justifyContent:'center',paddingLeft:45,}}>
      <SearchIcon name='search' style={{position:'absolute',bottom:17,left:15,color:'grey'}} size={30}/>
      <TextInput
      placeholder='Search'
      placeholderTextColor={'grey'}
      style={{fontSize:22}}
      />
      <View style={{position:'absolute',flexDirection:'row',alignItems:'center',right:15,gap:10}}>
        <GoogleMicSvg />
        <GoogleLensSvg />
      </View>
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({})