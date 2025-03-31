import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { lensBottomData } from '../../utils/appData'
import { fontFamily } from '../../utils/styles'
import { colors } from '../../utils/colors'
import { GoogleMicSvg } from '../../assets/svg'

const BottomContainer = ({capturedImage,separateImage}:{capturedImage:string,separateImage:string}) => {
    const [buttonState, setButtonState] = React.useState(1)
    const {childContainer,bottomContainer,actionButton,buttonText} = styles
    return (
   <>
    <View>
    {
              capturedImage&&
              <View style={{height:50,flexDirection:'row',borderRadius:25,backgroundColor:colors.searchBarColor,alignItems:'center',paddingHorizontal:30,width:'100%'}}>
              <Text>Svg</Text>
              <Image src={separateImage?.uri} style={{width:400,height:200,marginTop:100,resizeMode:'contain'}}/>
             <TextInput
              placeholder='Search...'
              style={{fontFamily:fontFamily.ProductSansMedium}}
              />
              <GoogleMicSvg/>
             </View>
            }
    <View style={bottomContainer}>
            <View style={childContainer}>
           
            {/* {
                lensBottomData?.map((e,i)=>{
                    return (
                     <Pressable onPress={()=>setButtonState(i)} key={i.toString()} style={[actionButton,{backgroundColor:buttonState==i?colors.light.blue:'#ffffff00',borderColor:buttonState==i?colors.light.blue:colors.lightGrey}]}>
                        {e.icon}
                        <Text style={[buttonText,{color:buttonState==i?colors.google.blue:colors.black,opacity:buttonState==i?1:.7}]}>{e.name}</Text>
                      </Pressable>
                    )
                })
            } */}
            </View>
            
          </View>
    </View>
   </>
  )
}

export default BottomContainer

const styles = StyleSheet.create({
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        flex:1,
      },
      childContainer:{flexDirection:'row',width:'100%',paddingHorizontal:10,gap:8,alignItems:'center',justifyContent:'center'},
      actionButton: {
        padding: 6,
        paddingHorizontal:10,
        borderRadius: 100,
        borderWidth:1,
        borderColor:colors.lightGrey,
        flexDirection:'row',
        alignItems:'center',

        gap:5
      },
      
      buttonText: {fontSize: 14,opacity:.7, fontFamily:fontFamily.ProductSansMedium},
      searchIcon: {fontSize: 24, fontWeight: 'bold'},
})