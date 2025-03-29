import { StyleSheet, View } from 'react-native'
import React from 'react'
import { colors } from '../../utils/colors'

const Divider = ({top=27}:{top?:number}) => {
    const {dividerStyle} = styles
  return (
    <View style={[dividerStyle,{marginTop:top}]}/>
  )
}

export default Divider

const styles = StyleSheet.create({
    dividerStyle:{borderTopWidth:1.7,borderColor:colors.grey,opacity:.15}
})