import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import React from 'react'
import { GoogleLensSvg, GoogleMicSvg } from '../../assets/svg';
import { fontFamily } from '../../utils/styles';
import { colors } from '../../utils/colors';
import Divider from '../../components/Divider';
import SearchList from './SearchList';
import { useNavigation } from '@react-navigation/native';
import { navigationKey } from '../../utils/navigation';

const SearchScreen = () => {
  const {mainContainer,searchIcon,googleAsset,textInputstyle,parentView} = styles

  const navigation:any = useNavigation();

  React.useEffect(() => {
    navigation.setOptions({ tabBarStyle: { display: 'none' } });
    
    return () => {
      navigation.setOptions({ tabBarStyle: undefined }); // Restore tabBar when leaving
    };
  }, [navigation]);

  const navigateToHome = ()=>{
    navigation.navigate(navigationKey.HOME)
  }
  return (
    <View style={parentView}>
        <View style={mainContainer}>
      <Pressable style={searchIcon} onPress={navigateToHome}>
         <MaterialIcon name='arrow-back'  size={25}/>
      </Pressable>
      <TextInput
      placeholder='Search...'
      placeholderTextColor={colors.grey}
      style={textInputstyle}
      />
      <View style={{borderBottomWidth:1,borderColor:colors.lightGrey,top:0}}/>
      <View style={googleAsset}>
        <GoogleMicSvg width={30} height={30} />
        <GoogleLensSvg  width={22} height={22} />
      </View>
    </View>
    <SearchList/>
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  parentView:{paddingHorizontal:10,paddingTop:0,backgroundColor:'#fff',flex:1},
  mainContainer:{height:40,borderRadius:100,marginTop:10,justifyContent:'center',},
  searchIcon:{position:'absolute',zIndex:9999999999,left:10,color:colors.black},
  googleAsset:{position:'absolute',flexDirection:'row',alignItems:'center',right:15,gap:20},
  textInputstyle:{fontSize:17,paddingHorizontal:53,height:45,borderColor:colors.grey}

})