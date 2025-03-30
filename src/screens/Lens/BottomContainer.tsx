import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { lensBottomData } from '../../utils/appData'
import { fontFamily } from '../../utils/styles'
import { colors } from '../../utils/colors'

const BottomContainer = () => {
    const [buttonState, setButtonState] = React.useState(1)
    const {childContainer,bottomContainer,actionButton,buttonText} = styles
  return (
     <View style={bottomContainer}>
            <View style={childContainer}>
            {
                lensBottomData?.map((e,i)=>{
                    return (
                     <Pressable onPress={()=>setButtonState(i)} key={i.toString()} style={[actionButton,{backgroundColor:buttonState==i?colors.light.blue:'#ffffff00',borderColor:buttonState==i?colors.light.blue:colors.lightGrey}]}>
                        {e.icon}
                        <Text style={[buttonText,{color:buttonState==i?colors.google.blue:colors.black,opacity:buttonState==i?1:.7}]}>{e.name}</Text>
                      </Pressable>
                    )
                })
            }
            </View>
            
          </View>
  )
}

export default BottomContainer

const styles = StyleSheet.create({
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        flex:1
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