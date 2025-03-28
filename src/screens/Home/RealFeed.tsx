import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { realFeedImage1 } from '../../assets/images'

const RealFeed = () => {
    const data = [1,2,3,4]
  return (
    <View>
     {
        data?.map((e,i)=>{
            return (
                <View key={i.toString()} style={{ backgroundColor: 'white',marginTop:15,
                    borderRadius:20,
                    overflow:'hidden' }}
                >
                    <View style={{height:230,borderRadius:20}}>
                        <Image
                        source={realFeedImage1}
                        style={{height:'100%',aspectRatio:4/2,}}
                        
                        />
                        </View>
                      <View  style={{padding:10,flexDirection:'column',justifyContent:'space-between',height:130}}>
                      <View>
                            <Text style={{fontSize:20,fontWeight:'500',lineHeight:25}} numberOfLines={3}>{` Cabin approved 2% in \n dearness allowance for centrl \n goverment employess and parliament`}</Text>
                        </View>
                
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                            <Text>DD News 4h</Text>
                            <Text>actions</Text>
                        </View>
                      </View>
                      </View>
            )
        })
     }
    </View>
  )
}

export default RealFeed

const styles = StyleSheet.create({})