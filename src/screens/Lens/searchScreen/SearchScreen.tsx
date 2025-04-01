import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { mockSearchData } from '../../../utils/appData'
import { deviceWidth } from '../../../utils/styles'
import { colors } from '../../../utils/colors'
import { MyntraSvg } from '../../../assets/svg'
import NormalText from '../../../components/TextInputs/NormalText'
import BoldText from '../../../components/TextInputs/BoldText'

const SearchScreen = ({scrollEnabled,setScrolledEnabled,searchListAnimation}:{scrollEnabled:boolean,setScrolledEnabled:any,searchListAnimation:any}) => {
     const heights = [160, 170, 150, 180, 150];    
    const renderSearchItem = ({ item ,index}) => {
        const { snippet,image_url,source_icon,source} = item;
        const itemHeight = heights[index % heights.length]; 
        return (
           <View style={{margin:5}}>
             <View style={{
                height: itemHeight,
                width: deviceWidth / 2.2,
                borderColor: colors.grey,
                paddingBottom:5,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius:15,
                overflow:'hidden'
            }}>
                <Image source={{uri:image_url}} style={{width:'100%',height:'100%',resizeMode:'cover'}} />
               
            </View>
               <View style={{gap:5}}>
               <View style={{flexDirection:'row',alignItems:'center',gap:8,paddingHorizontal:5}}>
               <Image source={source_icon}style={{width:20,height:20,resizeMode:'contain'}}/>
               <NormalText text={source}/>
               </View>
               <View>
                  <BoldText style={{width:deviceWidth/2.2}} numberOfLines={2} text={snippet}/>
               </View>
               </View>
           </View>
        );
    };

    const numColumns = 2;

  return (
    <View >   
        <FlatList
            data={mockSearchData[0]?.search_results}
            keyExtractor={(e,i)=>i.toString()}
            scrollEnabled={scrollEnabled}
            renderItem={renderSearchItem}
            onScroll={searchListAnimation}
            contentContainerStyle={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'}}
        />
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({})