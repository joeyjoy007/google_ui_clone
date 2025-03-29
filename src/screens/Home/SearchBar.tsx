import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import SearchIcon from 'react-native-vector-icons/MaterialIcons';
import React from 'react'
import { GoogleLensSvg, GoogleMicSvg } from '../../assets/svg';
import QuickFeed from './QuickFeed';
import { fontFamily } from '../../utils/styles';
import { colors } from '../../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { navigationKey } from '../../utils/navigation';
import BoldText from '../../components/TextInputs/BoldText';

const SearchBar = () => {
  const {mainContainer,searchIcon,googleAsset,textInputstyle} = styles
  const navigation:any = useNavigation()
  return (
    <TouchableOpacity onPress={()=>navigation.navigate(navigationKey.SEARCH)} style={mainContainer}>
      <SearchIcon name='search' style={searchIcon} size={30}/>
        <BoldText style={textInputstyle} text='Search'/>
      <View style={googleAsset}>
        <GoogleMicSvg />
        <GoogleLensSvg />
      </View>
    </TouchableOpacity>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  mainContainer:{height:65,backgroundColor:'#E8EAED',borderRadius:100,marginTop:10,justifyContent:'center',paddingLeft:45},
  searchIcon:{position:'absolute',bottom:17,left:15,color:'grey'},
  googleAsset:{position:'absolute',flexDirection:'row',alignItems:'center',right:15,gap:10},
  textInputstyle:{fontSize:22,fontFamily:fontFamily.ProductSansRegular,color:colors.grey,marginLeft:8}
})