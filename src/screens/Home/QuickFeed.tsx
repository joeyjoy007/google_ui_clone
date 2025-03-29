import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Language from 'react-native-vector-icons/Ionicons';
import Music from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageSearch from 'react-native-vector-icons/MaterialCommunityIcons';
import Study from 'react-native-vector-icons/Entypo';

import React from 'react'
import { colors } from '../../utils/colors';

const QuickFeed = () => {

    const {mainContainer,container,iconStyle} = styles

    const quickFeedItems =[
        {
            color:colors.light.orange,
            icon:<ImageSearch color={colors.dark.orange} size={20} name={"image-search-outline"}/>
        },
        {
            color:colors.light.blue,
            icon:<Language color={colors.dark.blue} size={20} name={"language"}/>

        },
        {
            color:colors.light.green,
            icon:<Study size={20} color={colors.dark.green} name={"graduation-cap"}/>
            
        },
        {
            color:colors.light.red,
            icon:<Music size={20} color={colors.dark.red} name={"music-note"}/>

        },
    ]

  return (
   <ScrollView horizontal style={mainContainer}>
     <View style={container}>
          {/* <View  style={{backgroundColor:'#222',height:50,width:70,borderRadius:40}}>

          </View> */}
     {
        quickFeedItems?.map((e:{color:string,icon:any},i:number)=>{
            return (
                <View key={i.toString()} style={[iconStyle,{backgroundColor:e.color}]}>
                    {e?.icon}
                </View>
            )
        })
     }
    </View>
   </ScrollView>
  )
}

export default QuickFeed

const styles = StyleSheet.create({
    mainContainer:{marginTop:10},
    container:{flexDirection:'row',gap:7.5},
    iconStyle:{height:50,alignItems:'center',justifyContent:'center',width:74,borderRadius:40}
})